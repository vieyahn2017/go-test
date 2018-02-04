/*
* jQuery pager plugin
* Version 1.0 (12/22/2008)
* @requires jQuery v1.2.6 or later
*
* Example at: http://jonpauldavies.github.com/JQuery/Pager/PagerDemo.html
*
* Copyright (c) 2008-2009 Jon Paul Davies
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* Read the related blog post and contact the author at http://www.j-dee.com/2008/12/22/jquery-pager-plugin/
*
* This version is far from perfect and doesn't manage it's own state, therefore contributions are more than welcome!
*
* Usage: .pager({ pagenumber: 1, pagecount: 15, buttonClickCallback: PagerClickTest });
*
* Where pagenumber is the visible page number
*       pagecount is the total number of pages to display
*       buttonClickCallback is the method to fire when a pager button is clicked.
*
* buttonClickCallback signiture is PagerClickTest = function(pageclickednumber) 
* Where pageclickednumber is the number of the page clicked in the control.
*
* The included Pager.CSS file is a dependancy but can obviously tweaked to your wishes
* Tested in IE6 IE7 Firefox & Safari. Any browser strangeness, please report.
*/
(function($) {
    $.fn.pager = function(options) {
        var opts = $.extend({}, $.fn.pager.defaults, options);
        return this.each(function() {
        // empty out the destination element and then render out the pager with the supplied options
            $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback));
            // specify correct cursor activity
            $('.pagination li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
        });
    };
    // render and return the pager with the supplied options
    function renderpager(pagenumber, pagecount, buttonClickCallback) {
        // setup $pager to hold render
        var $pager = $('<ul class="pagination"></ul>');
        // add in the previous and next buttons
        $pager.append(renderButton('first', pagenumber, pagecount, buttonClickCallback)).append(renderButton('prev', pagenumber, pagecount, buttonClickCallback));
        // pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in next version ) so handle edge cases
        var startPoint = 1;
        var endPoint = 9;
        if (pagenumber > 4) {
            startPoint = pagenumber - 4;
            endPoint = pagenumber + 4;
        }
        if (endPoint > pagecount) {
            startPoint = pagecount - 8;
            endPoint = pagecount;
        }
        if (startPoint < 1) {
            startPoint = 1;
        }
        // loop thru visible pages and render buttons
        for (var page = startPoint; page <= endPoint; page++) {
            var currentButton = $('<li class="page-number"><a>' + (page) + '</a></li>');
            page == pagenumber ? currentButton.addClass('active') : currentButton.click(function() { buttonClickCallback(this.firstChild.text); });
            currentButton.appendTo($pager);
        }
        //select
        /*var listall = $('<select></select>');//111
        var options = "";
	for (var i = 1; i <= pagecount; i++)
	{
		if(i==pagenumber){
			options +=  "<option selected values='"+i+"'>"+i+"</option>";	
		}else{
			options +=  "<option values='"+i+"'>"+i+"</option>";	
		}
			
	}
	listall.html(options);
	listall.change(function(){
		//buttonClickCallback(listall.attr("value")); 
		buttonClickCallback($(this).val()); 
	})
        listall.addClass('pgEmpty');
        if(pagecount>1){
        	listall.appendTo($pager);
        }
	*/
	//add - end
        // render in the next and last buttons before returning the whole rendered control back.
        $pager.append(renderButton('next', pagenumber, pagecount, buttonClickCallback)).append(renderButton('last', pagenumber, pagecount, buttonClickCallback));
        //$pager.append(renderButton('last', pagenumber, pagecount, buttonClickCallback));
        return $pager;
    }
    // renders and returns a 'specialized' button, ie 'next', 'previous' etc. rather than a page number button
    function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
        var destPage = 1;
        // work out destination page for required button type
        switch (buttonLabel) {
            case "first":
                destPage = 1;
				zh_CN_buttonLabel = '<a>First</a>';
                break;
            case "prev":
                destPage = pagenumber - 1;
				zh_CN_buttonLabel = '<a>Prev</a>';
                break;
            case "next":
                destPage = pagenumber + 1;
				zh_CN_buttonLabel = '<a>Next</a>';
                break;
            case "last":
                destPage = pagecount;
				zh_CN_buttonLabel = '<a>Last</a>';
                break;
        }
	//first \u7b2c\u4e00\u9875   prev    \u4e0a\u4e00\u9875
	//next \u4e0b\u4e00\u9875   last    \u6700\u672b\u9875
        var $Button = $('<li class="pgNext">' + zh_CN_buttonLabel + '</li>');
        // disable and 'grey' out buttons if not needed.
        if (buttonLabel == "first" || buttonLabel == "prev") {
            pagenumber <= 1 ? $Button.addClass('disabled') : $Button.click(function() { buttonClickCallback(destPage); return false;});
        }
        else {
            pagenumber >= pagecount ? $Button.addClass('disabled') : $Button.click(function() { buttonClickCallback(destPage); return false;});
        }
        return $Button;
    }
    // pager defaults. hardly worth bothering with in this case but used as placeholder for expansion in the next version
    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    };
})(jQuery);
