/////////////////////////////////////////////////////////////////////
// jQuery Numeric Input plugin, Zach Johnson
// ******************************************************************
// Constrains input fields to only numeric values
// 
// usage: $("#somefield").numeric(5,2)
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
// todo
// -check position and allow entering of additional digits if length rules allow
// 		i.e if "55.55" is entered but field was set for .numeric(5,2) allow entering of 
//		three additional integer digits
// -allow a leading zero for decimal values when intLength is zero<br>
// -allow ctrl+a select all (shift+home/end does work though)<br>


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
		var negative = 0;
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
					if (value.indexOf('-') == 0) {
						// - already exists, prevent
						event.preventDefault();
					} else {
						// prevent unless minus hit at beginning of field, check caret position
						var input = $this.get(0);
						if ('selectionStart' in input) {
							if (input.selectionStart != 0) {
								// not at beginning, prevent
								event.preventDefault();
							} else {
								// allow minus, increase maxlength by 1 to accommodate
								var max = $this.attr("maxlength");
								$this.attr("maxlength", max+1);
								return;
							}
						}
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
				if (value.indexOf('.') == -1 && value.length >= (intLength+negative) && decimalLength != 0) {
					value = value + ".";
					$(this).val(value);
				} 
			}
		
			checkDecimal();
		});

		$this.keyup(function(event) {
			value = $this.val();
			if (value.indexOf('.') == -1 && value.length > (intLength+negative)) {
				$(this).val(value.substr(0,value.length - (value.length-intLength-negative)));
			}
		});
	  
		function checkDecimal() {
			value = $this.val();
			
			// check for minus sign
			if (value.indexOf('-') == 0) {
				negative = 1;
			} else {
				negative = 0;
			}
			
			// check for decimal
			if (value.indexOf('.') == -1) {
				decimalUsed = false;
				$this.attr('maxlength', intLength+negative);
			} else {
				decimalUsed = true;
				if (value.indexOf('.') + decimalLength <= intLength+negative+decimalLength) {
					$this.attr('maxlength', value.indexOf('.') + decimalLength + 1);
				} else {
					$this.attr('maxlength', intLength+negative + decimalLength + 1);
				}
			}
		}
    });

  };
})( jQuery );