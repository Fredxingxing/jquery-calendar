/**
 * id: 渲染的Dom id
 * time:划重点时间段
 * **/
var calendar = (function () {
  var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  var monthDays = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var today = now.getDate()
  var weekday = now.getDay()
  var $NOW = {
    y: year,
    m: month,
    d: today
  }
  var monthDays = []
  // 储存render方法传进来的值
  var $calendarBody = null
  var period = null
  // 传参
  var _this = this
  var setMonthDays = function (year) {
    if (year % 4 === 0) {
      // 闰年，二月有29天
      return [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    } else {
      // 平年
      return [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }
  }
  var goDate = function (y, m, d) {
    var date = new Date()
    if (y >= 1970 && y <= 3000 && Math.floor(y) === y) {
      date.setFullYear(y)
      setMonthDays(y)
    } else {
      console.error('Calandar Not Support 1970- and 3000+')
      return
    }
    if (d >= 1 && d <= monthDays[m] && Math.floor(d) === d) {
      date.setDate(d)
    } else {
      console.error('Wrong Day Format')
      return
    }
    if (m > 0 && m < 13 && Math.floor(m) === m) {
      date.setMonth(m - 1)
    } else {
      console.error('Wrong Month Format')
      return
    }
    year = date.getFullYear()
    month = date.getMonth() + 1
    today = date.getDate()
    weekday = date.getDay()
    date.setTime(date.setDate(1))
    // 获取本月1号是星期几
    firstDayOfThisMonth = date.getDay()
    // 重置
    date.setTime(date.setDate(today))
    $('#side-date')[0].textContent = year + '-' + month + '-' + today
    $('#side-week')[0].textContent = weekdays[weekday]
    $('#side-day')[0].textContent = today
    // 清空calandar-body
    $calendarBody.html('')
    renderCalendar()
  }
  var renderCalendar = function (id, time) {
    // 创建日历主体
    var currentMonthDay = 1
    var nextMonthDay = 1
    var preMonthDay = monthDays[month - 1]
    var currentShowDays = monthDays[month] + firstDayOfThisMonth
    var lines = Math.ceil(currentShowDays / 7)
    $calendarBody = id ? $('#' + id) : $calendarBody
    period = period ? period : makePeriod(time)
    // 清空
    $calendarBody.html('')
    for (var i = 0; i < lines; i++) {
      var row = '<div class="row" id="row-' + i + '"></div>'
      $calendarBody.append(row)
      var $row = $('#row-' + i)
      for (let j = 0; j < 7; j++) {
        var cell = '<div class="cell"></div>'
        var pos = i * 7 + j + 1
        // 计算前一个月的日期
        if (pos <= firstDayOfThisMonth) {
          var lastMonthDay = preMonthDay - (firstDayOfThisMonth - pos)
          var lastMonthDayClass = ' not-toMonth'
          if (isInTime(year, month, nextMonthDay, period)) {
            lastMonthDayClass += ' inTime'
          }
          cell = '<div class="cell' + lastMonthDayClass + '" id="last-month-' + lastMonthDay + '">' + lastMonthDay + '</div>'
          $row.append(cell)
          $('#last-month-' + lastMonthDay).click(function () {
            if (month == 1) {
              year--
              month = 13
            }
            goDate(year, month - 1, +this.textContent)
          })
        }
        // 确定当月1号的位置, 并计算后续的日期
        if (pos > firstDayOfThisMonth) {
          if (currentMonthDay <= monthDays[month]) {
            var cellClass = 'cell'
            if (currentMonthDay == today) {
              cellClass = 'cell today'
            }
            if (isInTime(year, month, currentMonthDay, period)) {
              cellClass += ' inTime'
            }
            // dayID = currentMonthDay
            cell = '<div class="' + cellClass + '" id="day-' + currentMonthDay + '">' + currentMonthDay + '</div>'
            $row.append(cell)
            $('#day-' + currentMonthDay).click(function () {
              goDate(year, month, +this.textContent)
            })
            currentMonthDay++

          } else {
            // 判断是否在时间段
            var nextMonthClass = ' not-toMonth'
            if (isInTime(year, month + 1, nextMonthDay, period)) {
              nextMonthClass += ' inTime'
            }
            cell = '<div class="cell ' + nextMonthClass + '" id="next-month-' + nextMonthDay + '">' + nextMonthDay + '</div>'
            $row.append(cell)
            $('#next-month-' + nextMonthDay).click(function () {
              if (month == 12) {
                year++
                month = 0
              }
              goDate(year, month + 1, +this.textContent)
            })
            nextMonthDay++
          }
        }
      }
    }
  }
  var makePeriod = function (time) {
    var period = []
    if (time || Array.isArray(time) || time instanceof Array) {
      for (var timeIndex = 0; timeIndex < time.length; timeIndex++) {
        if ((/[0-9]|\-/).test(time[timeIndex])) {
          period[timeIndex] = time[timeIndex].slice(0)
          period[timeIndex] = time[timeIndex].split('-')
        } else {
          throw '时间周期的时间格式不对'
        }
      }
    } else {
      period = null
    }
    return period
  }
  var isInTime = function (y, m, d, time) {
    if (!period) {
      return false
    }
    var isBefore = function (y, m, d, time) {
      if (y > time[0]) {
        return false
      }
      if (y == time[0]) {
        if (m > time[1]) {
          return false
        }
        if (m == time[1]) {
          if (d > time[2]) {
            return false
          }
        }

      }
      return true
    }
    var isAfter = function (y, m, d, time) {
      if (y < time[0]) {
        return false
      }
      if (y == time[0]) {
        if (m < time[1]) {
          return false
        }
        if (m == time[1]) {
          if (d < time[2]) {
            return false
          }
        }

      }
      return true
    }
    return isAfter(y, m, d, time[0]) && isBefore(y, m, d, time[1])
  }
  monthDays = setMonthDays(year)
  now.setTime(now.setDate(1))
//  获取本月1号的星期日
  var firstDayOfThisMonth = now.getDay()
//重置
  now.setTime(now.setDate(today))
  // 设置sidebar的字段
  $('#side-date')[0].textContent = year + '-' + month + '-' + today
  $('#side-week')[0].textContent = weekdays[weekday]
  $('#side-day')[0].textContent = today
  $('#backToday').click(function () {
    goDate($NOW.y, $NOW.m, $NOW.d)
  })
  $('#lastIcon').click(function () {
    if (month == 1) {
      year--
      month = 13
    }
    goDate(year, month - 1, 1)
  })
  $('#nextIcon').click(function () {
    _this.documentIselcet = this
    if (month == 12) {
      year++
      month = 0
    }
    goDate(year, month + 1, 1)
  })
  return {
    render: renderCalendar
  }
})()
calendar.render('calendar-content',['2019-09-29','2019-10-04'])
