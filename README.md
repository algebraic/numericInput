jQuery numericInput Plugin
============
<hr>
A simple jQuery plugin to constrain inputs to numeric-only - including a single decimal, excluding !@#$%^&amp;*() (shift+0-9). 

Optionally set limits for number of characters to both right and left of decimal.

Demo at http://jsfiddle.net/hSHsh/.
<hr>

Usage
============
    $("#noParams").numeric();       //numbers only & one period allowed
    $("#singleParam").numeric(5);   //5 number places allowed and NO decimal
    $("#fullParams").numeric(4,2);  //4 whole number places and two decimal places allowed (like currency)

What it Does
============
<hr>
It allows only the entry of the numbers 0-9 and a single decimal (subsequent decimals are ignored).

With <b>no parameters</b>, default field length is 99 whole numbers + 1 decimal + 99 decimal places, for 199. If for some reason you require more than that (or more to the point, if you require less than that) just set some parameters.

A <b>single parameter</b> sets integer length and says <b>NO DECIMALS!</b> Decimal key is locked out and the input is limited to the specified length.

With <b>two parameters</b>, you specify whole number length (first number) and number of decimal places (second number). A value of zero for either completely disallows numbers on that side of the decimal. 

Great for currency --<br>
<code>
    $(':text').numeric(5,2);
</code>

 -- has the effect of limiting fields to a maximum value of 99999.99.
<hr>

To do:
============
<hr>
-allow negative values<br>
-allow a leading zero for decimal values when intLength is zero<br>
-fix ctrl+a select all (shift+home/end does work though)<br>
<hr>

<br>
My first attempt at a jQuery plugin - please be kind.  ;)