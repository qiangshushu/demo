$(function() {	
	$.fn.extend({
		datepicker: function(opt) {
			var self = this;
			
			var temp = 
			'<div class="mask"></div>\
			<div class="wrapper">\
				<div class="title"></div>\
				<table>\
					<tr>\
						<td>\
							<div class="scroller">\
								<ul id="year"></ul>\
							</div>\
							<div class="dwwol"></div>\
						</td>\
						<td>\
							<div class="scroller">\
								<ul id="month"></ul>\
							</div>\
							<div class="dwwol"></div>\
						</td>\
						<td>\
							<div class="scroller">\
								<ul id="day"></ul>\
							</div>\
							<div class="dwwol"></div>\
						</td>\
					</tr>\
				</table>\
				<div class="footer">\
					<span class="btn c">取消</span>\
					<span class="btn s">确定</span>\
				</div>\
			</div>';
			
			
			
			//$('.title').text(getToday());
			
			var options = {
				startYear: opt.startYear || 1900,
				endYear: opt.endYear || 2100,
			}
			for (var i = options.startYear; i <= options.endYear; i++) {
				$('#year').append('<li>'+i+'</li>');
			}
			
			for (var i = 1; i <= 12; i++) {
				$('#month').append('<li>'+i+'</li>');
			}
			
			for (var i = 1; i <= 31; i++) {
				$('#day').append('<li>'+i+'</li>');
			}
			
			setToday();
					
			$('#year').on('change', function() {
				setDaysByYM($(this).val(), $('#month').val());
			});
			
			$('#month').on('change', function() {
				setDaysByYM($('#year').val(), $(this).val());
			});
			
			var timeout;
			$('.scroller').scroll(function(){
				var self = this;
				if (timeout){
					clearTimeout(timeout);
				}
				timeout = setTimeout(function() {
					var top = $(self).scrollTop();
					var index = Math.round(top / 36);
					$(self).animate({
						scrollTop: index*36
					}, 100);
					$(self).find('li').removeClass('active').eq(index).addClass('active');
					$('.title').text(getChooseDate());
				},100);
			});
			
			function setToday() {
				var today = getToday();
				var year = today.split('-')[0];
				var month = today.split('-')[1];
				var day = today.split('-')[2];
				$('#year').parent().scrollTop();
			}
			
			function setDaysByYM(year, month) {
				var days = calendar.solarDays(year, month);
				var days2 = $('#day li').length;
				$('#day li').show();
				for (var i = 0; i < (days2 - days); i++) {
					$('#day li:eq('+(30-i)+')').hide();
				}
			}
			
			function getToday() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				return formatDate(year, month, day);
			}
			
			function formatDate(year, month, day) {
				if (month < 10) {
					month = '0' + month;
				}
				if (day < 10) {
					day = '0' + day;
				}
				return year+'-'+month+'-'+day;
			}
			
			function getChooseDate() {
				var year = $('#year li.active').active();
				var month = $('#month li.active').active();
				var day = $('#day li.active').active();
				return formatDate(year, month, day);
			}
		}
	});	
	
	$('#birthday').datepicker({
		startYear: 1900,
		endYear: 2100
	});
});