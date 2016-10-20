/*global angular*/
/*jslint plusplus: true*/
/*!
* Angular Color Picker
*
* File:        angular-colorpicker-dr.js
* Version:     0.1.0
*
* Author:      Daniel Reznick
* Info:        https://github.com/vedmack/angular-colorpicker
* Contact:     vedmack@gmail.com
* Twitter:	   @danielreznick
* Q&A		   http://stackoverflow.com
*
* Copyright 2015 Daniel Reznick, all rights reserved.
* Copyright 2015 Released under the MIT License
*
* This source file is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
*/
(function () {
    'use strict';
    var directive = function ($compile, $document, $window) {
        return {
			restrict: 'A',
            require: 'ngModel',
            scope: {
                changeColor: "&",
				tinyTrigger: "@",
				colorMe: "@",
				ngModel : '='
            },

            link: function (scope, element, attrs, ngModel) {
                var content,
                    templateHidden = '<div class="color-picker-wrapper body hide">',
                    templateInline = '<div class="color-picker-wrapper">',
                    template =
                            '<div class="color-picker-row-wrapper">' +
                                '<div class="color-picker-row">' +
                                    '<cp-color class="color-picker navy" color="#001F3F">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker blue" color="#0074D9">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker aqua" color="#7FDBFF">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker teal" color="#39CCCC">' +
                                    '</cp-color>' +
                                '</div>' +
                            '</div>' +
                            '<div class="color-picker-row-wrapper">' +
                                '<div class="color-picker-row">' +
                                    '<cp-color class="color-picker olive" color="#3D9970">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker green" color="#2ECC40">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker lime" color="#01FF70">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker yellow" color="#FFDC00">' +
                                    '</cp-color>' +
                                '</div>' +
                            '</div>' +
                            '<div class="color-picker-row-wrapper">' +
                                '<div class="color-picker-row">' +
                                    '<cp-color class="color-picker orange" color="#FF851B">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker red" color="#FF4136">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker maroon" color="#85144B">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker fuchia" color="#F012BE">' +
                                    '</cp-color>' +
                                '</div>' +
                            '</div>' +
                            '<div class="color-picker-row-wrapper">' +
                                '<div class="color-picker-row">' +
                                    '<cp-color class="color-picker purple" color="#B10DC9">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker black" color="#111111">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker gray" color="#AAAAAA">' +
                                    '</cp-color>' +
                                    '<cp-color class="color-picker white" color="#FFFFFF">' +
                                    '</cp-color>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
					templateTinyTrigger =
						'<div class="color-picker-wrapper picker-icon">' +
						'<div class="color-picker-row-wrapper">' +
							'<div class="color-picker-row">' +
								'<cp-color class="color-picker navy">' +
								'</cp-color>' +
								'<cp-color class="color-picker blue">' +
								'</cp-color>' +
								'<cp-color class="color-picker aqua">' +
								'</cp-color>' +
								'<cp-color class="color-picker teal">' +
								'</cp-color>' +
							'</div>' +
						'</div>' +
						'<div class="color-picker-row-wrapper">' +
							'<div class="color-picker-row">' +
								'<cp-color class="color-picker olive">' +
								'</cp-color>' +
								'<cp-color class="color-picker green">' +
								'</cp-color>' +
								'<cp-color class="color-picker lime">' +
								'</cp-color>' +
								'<cp-color class="color-picker yellow">' +
								'</cp-color>' +
							'</div>' +
						'</div>' +
						'<div class="color-picker-row-wrapper">' +
							'<div class="color-picker-row">' +
								'<cp-color class="color-picker orange">' +
								'</cp-color>' +
								'<cp-color class="color-picker red">' +
								'</cp-color>' +
								'<cp-color class="color-picker maroon">' +
								'</cp-color>' +
								'<cp-color class="color-picker fuchia">' +
								'</cp-color>' +
							'</div>' +
						'</div>' +
						'<div class="color-picker-row-wrapper">' +
							'<div class="color-picker-row">' +
								'<cp-color class="color-picker purple">' +
								'</cp-color>' +
								'<cp-color class="color-picker black">' +
								'</cp-color>' +
								'<cp-color class="color-picker gray">' +
								'</cp-color>' +
								'<cp-color class="color-picker white">' +
								'</cp-color>' +
							'</div>' +
						'</div>' +
						'</div>',
					elementTinyTrigger,
					elementColorPicker,
					closestFunc,
					prevFunc;
				prevFunc = function (elem) {
					if (elem.previousElementSibling) {
						return elem.previousElementSibling;
					}
					while (elem = elem.previousSibling) {
						if (elem.nodeType === 1) {
							return elem;
						}
					}
				};
				closestFunc = function (elem, cls) {
					var found = false;
					while (elem.parent() !== undefined && found === false) {
						if (elem.parent().hasClass(cls)) {
							found = true;
						}
						elem = elem.parent();
					}
					return elem;
				};
				if (scope.tinyTrigger !== undefined && scope.tinyTrigger === 'true') {
					templateTinyTrigger = templateTinyTrigger.replace('picker-icon', 'picker-icon trigger');
					elementTinyTrigger = $compile(templateTinyTrigger)(scope);
					element.replaceWith(elementTinyTrigger);

					template = templateHidden + template;
					elementColorPicker = angular.element(template);
					elementColorPicker.find('cp-color').on('click', function (ev) {
						ngModel.$setViewValue(angular.element(ev.target).attr('color'));
					});
					angular.element(document.body).append(elementColorPicker);

					elementTinyTrigger.bind("click", function (ev) {
						var wrapper = closestFunc(angular.element(ev.target), 'color-picker-wrapper'),
							top = wrapper[0].getBoundingClientRect().top,
							height = wrapper[0].getBoundingClientRect().height;
						top = top + $window.pageYOffset;

						elementColorPicker.removeClass('hide');
						elementColorPicker[0].style.top = top + height + 'px';
						elementColorPicker[0].style.left = wrapper[0].getBoundingClientRect().left + 'px';
						ev.stopPropagation();
					});

				} else {
					if (element[0].tagName === 'INPUT') {

						template = templateHidden + template;
						elementColorPicker = angular.element(template);
						elementColorPicker.find('cp-color').on('click', function (ev) {
							var color = angular.element(ev.target).attr('color');
							ngModel.$setViewValue(color);
							if (scope.colorMe !== undefined && scope.colorMe === 'true') {
								element[0].style.backgroundColor = color;
							} else {
								element.val(color);
							}
						});
						angular.element(document.body).append(elementColorPicker);

						element.bind("click", function (ev) {
							//show color picker beneath the input
							var top = ev.target.getBoundingClientRect().top,
								height = ev.target.getBoundingClientRect().height;
							top = top + $window.pageYOffset;

							elementColorPicker.removeClass('hide');
							elementColorPicker[0].style.top = top + height + 'px';
							elementColorPicker[0].style.left = ev.target.getBoundingClientRect().left + 'px';
							ev.stopPropagation();
						});

						elementTinyTrigger = $compile(templateTinyTrigger)(scope);
						element.after(elementTinyTrigger);
						elementTinyTrigger.bind("click", function (ev) {
							//show color picker beneath the input
							var $wrapper = closestFunc(angular.element(ev.target), 'color-picker-wrapper'),
								wrapperPrev = prevFunc($wrapper[0]),
								top = wrapperPrev.getBoundingClientRect().top,
								height = wrapperPrev.getBoundingClientRect().height;
							top = top + $window.pageYOffset;

							elementColorPicker.removeClass('hide');
							elementColorPicker[0].style.top = top + height + 'px';
							elementColorPicker[0].style.left = wrapperPrev.getBoundingClientRect().left + 'px';
							ev.stopPropagation();
						});

						$compile(content)(scope);
					} else {
						//replace element with the color picker
						template = templateInline + template;
						elementColorPicker = $compile(template)(scope);
						element.replaceWith(elementColorPicker);
						elementColorPicker.find('cp-color').on('click', function (ev) {
							ngModel.$setViewValue(angular.element(ev.target).attr('color'));
							ev.stopPropagation();
						});
					}
				}
				//when clicking somewhere on the screen / body -> hide the color picker
				$document.bind("click", function (ev) {
					var i,
						docChildren = $document.find('body').children();
					for (i = 0; i < docChildren.length; i++) {
						if (docChildren[i].getAttribute("class") && docChildren[i].getAttribute("class").indexOf('color-picker-wrapper body') !== -1) {
							angular.element(docChildren[i]).addClass('hide');
						}
					}
				});
	        }
        };
    };
    angular.module('colorpicker-dr', []).directive('colorPicker',['$compile', '$document', '$window', directive]);
}());
