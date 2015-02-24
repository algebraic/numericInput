jQuery numericInput Plugin
============
<hr>
A simple jQuery plugin to constrain inputs to numeric-only - including a single decimal, excluding !@#$%^&amp;*() (shift+0-9). 

Optionally set limits for number of characters to both right and left of decimal.

Demo at http://jsfiddle.net/WDVtv/.
<hr>

Usage
============
    $("#noParams").numeric();			// numbers only & one period allowed
    $("#singleParam").numeric(5);		// 5 number places allowed and NO decimal
    $("#fullParams").numeric(4,2);		// 4 whole number places and 2 decimal places allowed (like currency)
	$("#negative").numeric(5,2,true);	// 5 whole number, 2 decimal, and allowing negative values (minus sign at beginning) 

What it Does
============
<hr>
It allows only the entry of the numbers 0-9 and a single decimal (subsequent decimals are ignored).

With <b>no parameters</b>, default field length is 99 whole numbers + 1 decimal + 99 decimal places, for 199. If for some reason you require more than that (or more to the point, if you require less than that) just set some parameters.

A <b>single parameter</b> sets integer length and says <b>NO DECIMALS!</b> Decimal key is locked out and the input is limited to the specified length.

With <b>two parameters</b>, you specify whole number length (first number) and number of decimal places (second number). A value of zero for either completely disallows numbers on that side of the decimal. 

With the optional third boolean parameter set to true, you may add a minus sign (-) at the beginning of the value.

Great for currency --<br>
<code>
    $(':text').numeric(5,2);
</code>

 -- has the effect of limiting fields to a maximum value of 99999.99.
<hr>

Updates:
============
<hr>
02/24/15 - added support for input type="number"

02/06/15 - added support for negative values

10/21/14 - allowing up/down arrows & page up/down keys

To do:
============
<hr>
-allow a leading zero for decimal values when intLength is zero<br>
-allow ctrl+a select all (shift+home/end does work though)<br>
-check position and allow entering of additional digits if length rules allow
	i.e if "55.55" is entered but field was set for .numeric(5,2) allow entering of 
	three additional integer digits
