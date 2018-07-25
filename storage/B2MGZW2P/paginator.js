window.WS = window.WS || {};

WS.paginator = WS.paginator || {};

/**
 * Reloads a new page into the table
 */
WS.paginator.loadPage = function(p) {
    //var base_url = WS.app.base_url;
    var base_url = (typeof WS.app.base_url === 'undefined') ? '' : WS.app.base_url;
    var url = base_url + p.url;

    //AJAX parameters
    var opts = {
        page_size: p.page_size,
        pages_total: p.pages_total,
        num_ids: p.num_ids,
        host_class: p.host_class,
        current_page: p.current_page,
        id_list: p.id_list.join(','),
        extra_info: p.extra_info,
        access_class : p.access_class,
        access_id : p.access_id,
        sort_column : p.sort_column,
        sort_direction : p.sort_direction,
        resort : p.resort,
        sql_obj_id : p.sql_obj_id
    };

    //Disable the controls
    p.controls.find('img.paginator-button').css({opacity:'0.33',cursor:'default'}).unbind('click');
    p.input_pagenum.unbind('change');
    p.input_pagesize.unbind('change');

    //Make the table opaque
    p.table.css({opacity:'0.33'});

    //Load the new information into the table
    $.ajax({
       url: url,
       dataType: 'json',
       data: opts,
       type: 'POST',
       success: function(data) {
            id_list = data.id_list;
            table_html = data.table_html;
            table = $(table_html);

            p.id_list = id_list;
            p.table.html(table.html());
            p.table.css({opacity:'1.0'});
            WS.paginator.makePageControls(p);
        }
    });
};

/**
 * Function that adds how the paginator controls respond
 */
WS.paginator.makePageControls = function (p) {
    //Reset the resort flag
    p.resort = 0;
    
    //Add control for the 'previous page' button
    var prev_button = $(p.controls).find('img.paginator-prev-page');
    if(p.current_page > 1) {
        var prev_page = $.extend({}, p);
        prev_page.current_page = p.current_page - 1;
        prev_button.unbind('click').click(function() {
            prev_button.css({opacity:'0.33', cursor: 'default'}).unbind('click');
            WS.paginator.loadPage(prev_page);
        });
        prev_button.css({opacity:'1.0', cursor: 'pointer'});
    } else {
        prev_button.css({opacity:'0.33', cursor: 'default'});
    }

    //Add control for the next page button
    var next_button = $(p.controls).find('img.paginator-next-page');
    if(p.current_page < p.pages_total) {
        var next_page = $.extend({}, p);
        next_page.current_page = p.current_page + 1;
        next_button.unbind('click').click(function() {
            next_button.css({opacity:'0.33', cursor: 'default'}).unbind('click');
            WS.paginator.loadPage(next_page);
        });
        next_button.css({opacity:'1.0', cursor: 'pointer'});
    } else {
        next_button.css({opacity:'0.33', cursor: 'default'});
    }

    //Handler for the jump to page control
    var makeJumpHandler = function(p) {
        return function() {
            var $this = $(this);
            var new_page_num = parseInt($this.val());
            if(new_page_num == 0 || isNaN(new_page_num)) {
                alert("Please enter a page between 1 and " + p.pages_total + ".");
                $this.val(p.current_page);
                return;
            }
            if(new_page_num < 1) {
                new_page_num = 1;
            }
            if(new_page_num > p.pages_total) {
                new_page_num = p.pages_total;
            }
            $this.val(new_page_num);
            if(new_page_num != p.current_page) {
                var new_page = $.extend({}, p);
                new_page.current_page = new_page_num;
                WS.paginator.loadPage(new_page);
            }
        };
    };

    //Handler for the resize page control
    var makeResizeHandler = function(p) {
        return function () {
            var $this = $(this);
            var new_page_size = parseInt($this.val());
            if (new_page_size < 1 || isNaN(new_page_size)) {
                alert("Please enter a positive integer for a page size.");
                $this.val(p.page_size);
                return;
            }
            if (new_page_size > p.num_ids) {
                new_page_size = p.num_ids;
            }
            $this.val(new_page_size);
            if(new_page_size != p.page_size) {
                var new_page = $.extend({}, p);
                var pages_total = Math.round(p.num_ids / new_page_size);
                if((pages_total * new_page_size) < p.num_ids) {
                    pages_total = pages_total + 1;
                }
                new_page.page_size = new_page_size;
                new_page.pages_total = pages_total;
                new_page.current_page = 1;
                var pag_all = $(p.controls).find('div.paginator-all');
                if (0 < p.show_all_link_after_pages
                    && pages_total > p.show_all_link_after_pages) {
                    pag_all
                         .removeClass('paginator-all-closed')
                         .addClass('paginator-all-open');
                }
                else {
                    pag_all
                         .addClass('paginator-all-closed')
                         .removeClass('paginator-all-open');
                }
                WS.paginator.loadPage(new_page);
            }
        }
    }

    //Check what key was entered
    var handleKey = function(e) {
        if(window.event){
            intKey = event.keyCode;
        }
        else{
            intKey = e.which;
        }
        if(intKey == 13) {
            $(this).trigger('change');
            e.stopPropagation();
            return false;
        }
        if(intKey == 38 || intKey == 40){
            return false;
        }
    };

    var handleSeeAll = function (e) {
        p.input_pagesize.val(p.num_ids).change();
        return false;
    };

    //Add the jump to page handler
    p.input_pagenum.unbind('change').val(p.current_page).change(makeJumpHandler(p)).
        unbind('keydown').unbind('keypress').keypress(handleKey).keydown(handleKey);
    //Add the resize page handler
    p.input_pagesize.unbind('change').val(p.page_size).change(makeResizeHandler(p)).
        unbind('keydown').unbind('keypress').keypress(handleKey).keydown(handleKey);

    //Change the number of total pages based on the new information
    p.pages_total_control.html(p.pages_total);

    //Add handler for See All link
    p.see_all.unbind('click keydown keypress').bind('click keydown keypress', handleSeeAll);

    //Make the table sortable
    var makeSortable = function (p) {
        //Cause the table to reload when a new header is clicked
        var makeSortByHeaderHandler = function (p, i) {
            //Return closure to reload the table sorted by the indicated column
            return function () {
                //Get the sort column and sort direction
                var new_sort_column = parseInt(i);
                if(new_sort_column < 0 || isNaN(new_sort_column)) {
                    alert("There is an error in the column index " + i + ".");
                    return false;
                }
                var new_sort_direction = (new_sort_column == p.sort_column) ? -p.sort_direction : 1;

                //Reload the table
                var new_page = $.extend({}, p);
                new_page.current_page = 1;
                new_page.sort_column = new_sort_column;
                new_page.sort_direction = new_sort_direction
                new_page.resort = 1;
                WS.paginator.loadPage(new_page);

                //Don't do a page reload
                return false;
            }
        }

        //Don't sort
        var makeNoSortHandler = function (p, i) {
            return function() {
                return false;
            }
        }

        //Add sortable links to the headers
        p.table.find('thead th').each(
                    function (i, item) {
                        var header = $(item);

                        //Set the click handler and sort image
                        sort_arrow_img = '';
                        handler = makeNoSortHandler(p, i);
                        if (p.table.hasClass('paginator-tablesort')) {
                            //Create the wrapping anchor, and wrap the header with it
                            title = "Click to sort by " + header.html();
                            wrapper = '<a href="" class="paginator-sortheader" title="'+title+'"></a>';
                            header.wrapInner(wrapper);
                            
                            //Get the sort image, if we are sorting on this column
                            if (p.sort_column == i) {
                                //Get the sort image
                                img_file = (p.sort_direction == 1) ? '/img/icon/sort-down.gif' : '/img/icon/sort-up.gif';
                                img_alt = (p.sort_direction == 1) ? '&darr;' : '&uarr;';
                                sort_arrow_img = '<img style=\'vertical-align:middle;\' alt=\'' + img_alt + '\'' +
                                                 'src=' + '\'' + WS.app.base_url + img_file + '\'' +
                                                 '/>';
                            }

                            //Get the sorting handler
                            handler = makeSortByHeaderHandler(p, i);
                        }

                        //Add the handler and image to the header
                        header.find('a.paginator-sortheader').unbind('click').click(handler).append(
                            '<span class=\'paginator-sortarrow\'>' +
                                sort_arrow_img +
                            '</span>');
                    });
    }
    makeSortable(p);
};

/**
 * Main entry method for paginator. Moves to the indicated page
 */
WS.paginator.paginate = function(element_id, host_class, page_size, current_page, id_list,
                                 extra_info, access_class, access_id,
                                 sort_column, sort_direction, resort, sql_obj_id, url, show_all_link_after_pages) {
    var paginated = {};
    if ($.isPlainObject && $.isPlainObject(element_id)) {
        // support jQuery-style function arguments - a single Object
        var opts = element_id;
        host_class = opts.host_class;
        page_size = opts.page_size;
        current_page = opts.current_page;
        id_list = opts.id_list;
        extra_info = opts.extra_info;
        access_class = opts.access_class;
        access_id = opts.access_id;
        sort_column = opts.sort_column;
        sort_direction = opts.sort_direction;
        resort = opts.resort;
        sql_obj_id = opts.sql_obj_id;
        url = opts.url;
        show_all_link_after_pages = opts.show_all_link_after_pages;
        element_id = opts.element_id;
    }

    //Information on the classes and records the paginator interacts with
    paginated.element_id = element_id;
    paginated.host_class = host_class;
    paginated.id_list = id_list;
    paginated.access_class = access_class;
    paginated.access_id = access_id;

    //Get the html elements that the paginator needs to work on
    paginated.paginator = $('div.paginator_' + element_id);
    paginated.control_id = 'span.pagecontrol_' + element_id;
    paginated.controls = paginated.paginator.find(paginated.control_id);
    paginated.table = $('table#' + element_id);

    //Figure out the page values
    paginated.num_ids = id_list.length;
    var pages_total = Math.round(paginated.num_ids / page_size);
    if((pages_total * page_size) < paginated.num_ids) {
        pages_total = pages_total + 1;
    }
    paginated.page_size = page_size;
    paginated.current_page = current_page;
    paginated.pages_total = pages_total;
    paginated.pages_total_control = $('span.paginator_totalpages_' + element_id);

    //Input controls for the paginator
    paginated.input_pagenum = paginated.paginator.find('input.paginator-jump');
    paginated.input_pagesize = paginated.paginator.find('input.paginator-size');
    paginated.see_all = paginated.paginator.find('div.paginator-all');

    //Extra information that the back-end needs to be passed back-and-forth
    paginated.extra_info = extra_info;

    //For sorting the table
    paginated.sort_column = sort_column;
    paginated.sort_direction = sort_direction;
    paginated.resort = resort;
    paginated.sql_obj_id = sql_obj_id;
    paginated.show_all_link_after_pages = show_all_link_after_pages;

    paginated.url = url;
    
    WS.paginator.makePageControls(paginated);
};
