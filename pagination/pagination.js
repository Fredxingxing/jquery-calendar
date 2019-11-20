var pagination = (function () {
  var $paginationDom = null
  var page = 1;
  var defualt = {
    total_pages:3,
    id:'#pagination'
  }
  //页脚
  function render (pagination) {
    // var $paginationDom = $('#pagination')
    $paginationDom.html('')
    var $lastDom = '<li class="page-item" id="lastPage"><span class="page-link" >上一页</span></li>'
    var $nextDom = '<li class="page-item" id="nextPage"><span class="page-link" >下一页</span></li>'
    if (!pagination || pagination.total_pages == 1) {
      $lastDom = ''
      $nextDom = ''
    }
    $paginationDom.append($lastDom)
    $('#lastPage').click(function () {
      lastPageClick()
    })
    // 要判断剩余页少于6的时候
    var page_max = page + 5 > pagination.total_pages ? pagination.total_pages : page + 5
    var page_min = 0;
    if(pagination.total_pages>6){
      page_min = page - 1 < pagination.total_pages - 6 ? page - 1 : pagination.total_pages - 6
    }
    for (var index = page_min; index < page_max; index++) {
      var activeClass = page === (index + 1) ? 'page-active' : ''
      var $pageDom = '<li class="page-item" id="' + ('page-' + (index + 1)) + '"><span class="page-link ' + activeClass + '" >' + (index + 1) + '</span></li>'
      $paginationDom.append($pageDom);
      (function (index) {
        $('#' + 'page-' + (index + 1)).click(function () {
          pageClick(index + 1)
        })
      })(index)
    }
    if (pagination.total_pages > 6 && (pagination.total_pages - page) > 5) {
      var $moreDom = '<li class="page-item"><span class="page-link" >...</span></li>'
      $paginationDom.append($moreDom)
    }
    $paginationDom.append($nextDom)
    $('#nextPage').click(function () {
      nextPageClick(pagination.total_pages)
    })
  }

//页脚点击
  function pageClick (pageNum) {
    page = pageNum
    searchActivityStyle(pageNum)
    window.scrollTo(0, 0)
  }

  function lastPageClick () {
    page > 1 ? page-- : page
    searchActivityStyle(page)
    window.scrollTo(0, 0)
  }

  function nextPageClick (total_pages) {
    page < total_pages ? page++ : total_pages
    searchActivityStyle(page)
    window.scrollTo(0, 0)
  }
  return{
    render:render
  }
})()
