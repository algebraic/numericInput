/////////////////////////////////////////////////////////////////////
// jQuery Numeric Input plugin, Zach Johnson
// ******************************************************************
// Constrains input fields to only numeric values
// 
//	usage: $("#somefield").numeric(5,2)
// - allows five digits to the left of decimal and two to the right
// usage: $("#somefield").numeric()
// - allows 99 digits to either side of a single allowed decimal
// usage: $("#somefield").numeric(3)
// - allows 3 digits and no decimal
// usage: $("#negativefield").numeric(5,2,true)
//	- allows a single negative sign as first character of value and five digits to the left of decimal and two to the right
///////////////////////////////////////////////////////////////////////////////////////////////
// updated 10/21/14 - allowing up/down arrows & page up/down keys
// updated 02/06/15 - allowing negative values
// ******************************************************************

(function( $ ){

  $.fn.numeric = function(intLength, decimalLength, negative) {  
	// if no parameters passed, set int & decimal length to 99 (default values)
	if (intLength == null && decimalLength == null) {
		intLength = 99;
		decimalLength = 99;
	} else if (decimalLength == null) {
		decimalLength = 0;
	}

	return this.each(function() {

		var $this = $(this);
		var decimalUsed;
		var value = $this.val();
		
		$this.keydown(function(event) {

			checkDecimal();

			// allow only numbers and the following keys: tab, enter, backspace, delete, period(.), arrows, home/end, page up/down, minus (if negative=true)
			if ((event.keyCode > 32 && event.keyCode < 41) || (event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 116) || (!event.shiftKey && ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 110 || event.keyCode == 190 )) || (event.altKey && event.keyCode == 68) || (event.keyCode == 109 || event.keyCode == 189)) {
				// if period key pressed - check if period is present and don't allow if it is
				if (event.keyCode == 110 || event.keyCode == 190) {
					checkDecimal();
					if ((decimalUsed || decimalLength == 0) || value.length == intLength) {
						event.preventDefault();
					}
				}
				// if minus key pressed - disallow if value length > 0
				if (event.keyCode == 109 || event.keyCode == 189) {
					if (value.length > 0) {
						event.preventDefault();
					}
				}
			} else {
				// ensure that it is a number and stop the keypress
				if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
					event.preventDefault();
				}
			}
			
			// period insert, only on period or a number key
			value = $this.val();
			if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106) || event.keyCode == 110 || event.keyCode == 190) {
				if (value.indexOf('.') == -1 && value.length >= intLength && decimalLength != 0) {
						value = value + ".";
						$(this).val(value);
				} 
			}
		
			checkDecimal();
		});

//
		
		$this.keyup(function(event) {
			value = $this.val();
			if (value.indexOf('.') == -1 && value.length > intLength) {
				$(this).val(value.substr(0,value.length - (value.length-intLength)));
			}
		});
	  
//

		function checkDecimal() {
			value = $this.val();
			
			// check for decimal
			if (value.indexOf('.') == -1) {
					decimalUsed = false;
					$this.attr('maxlength', intLength);
				} else {
					decimalUsed = true;
					if (value.indexOf('.') + decimalLength <= intLength+decimalLength) {
						$this.attr('maxlength', value.indexOf('.') + decimalLength + 1);
					} else {
						$this.attr('maxlength', intLength + decimalLength + 1);
					}
			}
		}
//
    });

  };
})( jQuery );