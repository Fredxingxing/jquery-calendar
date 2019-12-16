function Pagination (option) {
  this.$paginationDom = null
  this.defualt = {
    page:1,
    total_pages:3,
    id:'pagination',
    color:'',
    pageClick:function() {

    },
  }
  this.defualt = $.extend(this.defualt,option)
  this.$paginationDom = $('#'+this.defualt.id)
  console.log(this.defualt)
  //页脚
  this.render =  function () {
    this.$paginationDom.html('')
    var _this = this
    var $lastDom = '<li class="page-item" id="lastPage"><span class="page-link" >上一页</span></li>'
    var $nextDom = '<li class="page-item" id="nextPage"><span class="page-link" >下一页</span></li>'
    if (!this.defualt || this.defualt.total_pages == 1) {
      $lastDom = ''
      $nextDom = ''
    }
    this.$paginationDom.append($lastDom)
    $('#lastPage').click(function () {
      _this.lastPageClick()
    })
    // 要判断剩余页少于6的时候
    var page_max = this.defualt.page + 5 > this.defualt.total_pages ? this.defualt.total_pages : this.defualt.page + 5
    var page_min = 0;
    if(this.defualt.total_pages>6){
      page_min = this.defualt.page - 1 < this.defualt.total_pages - 6 ? this.defualt.page - 1 : this.defualt.total_pages - 6
    }
    console.log(111)
    for (var index = page_min; index < page_max; index++) {
      var activeClass = this.defualt.page === (index + 1) ? 'page-active' : ''
      var $pageDom = '<li class="page-item" id="' + (this.defualt.id+'-' + (index + 1)) + '">' +
        '<span class="page-link ' + activeClass + '" >' + (index + 1) + '</span>' +
        '</li>'
      this.$paginationDom.append($pageDom);
      (function (index) {
        console.log('index////',index)
        $('#' + _this.defualt.id +'-' + (index + 1)).click(function () {
          console.log("click---",index)
          _this.pageClick(index + 1)
        })
      })(index)
    }
    console.log(2222)
    if (this.defualt.total_pages > 6 && (this.defualt.total_pages - this.defualt.page) > 5) {
      var $moreDom = '<li class="page-item"><span class="page-link" >...</span></li>'
      this.$paginationDom.append($moreDom)
    }
    this.$paginationDom.append($nextDom)
    $('#nextPage').click(function () {
      _this.nextPageClick(_this.defualt.total_pages)
    })
  }

//页脚点击
  this.pageClick = function (pageNum) {
    console.log(this.defualt.page,pageNum)
    if(this.defualt.page===pageNum){
      return
    }
    this.defualt.page = pageNum
    this.defualt.pageClick(pageNum)
    // this.render()
    window.scrollTo(0, 0)
  }

  this.lastPageClick = function () {
    if(this.defualt.page < 2){
      return
    }
    this.defualt.page--
    this.defualt.pageClick(this.defualt.page)
    this.render()
    window.scrollTo(0, 0)
  }

  this.nextPageClick = function (total_pages) {
    if(this.defualt.page < total_pages){
      this.defualt.page++
    }else{
      return
    }
    this.defualt.pageClick(this.defualt.page)
    this.render()
    window.scrollTo(0, 0)
  }
}
