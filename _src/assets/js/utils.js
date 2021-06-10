/**
 * Utils
 */
export default class Utils{

	/**
	 * viewport情報を返す
	 */
	 static get viewport() {
		let width = window.innerWidth;
		let height = window.innerHeight;
		let aspectRatio = width / height;

		return{
			width,
			height,
			aspectRatio
		}
	}

	/**
	 * 画面のピクセルレシオを返す ただし2以上は2とみなす
	 * @return {number} devicePixelRatio
	 */
	static get pixelRatio() {
		return window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1;
	}

	/**
	 * ゼロ埋め
	 * 
	 * @param {number} val - 0埋めしたい値
	 * @param {number} length - 桁数
	 */
	static zeroReplace(val, length) {
		return ('000000000' + (Math.ceil(val))).substr(-length);
	}

	/**
	 * 画像リソース読み込み
	 * 
	 * @param {string} src - 画像パス
	 * @param {string} alt
	 * @return {object}
	 */
	static loadImage(src, alt="") {
		var $d = $.Deferred();
		var img = new Image();
		img.onload = ()=>{
			return $d.resolve(img);
		}
		img.src = src;
		img.alt = alt;
		return $d.promise();
	}

	/**
	 * スクロール停止
	 * 
	 * @param {object} target - jQuery Object
	 */
	static noScroll(target) {
		var _prefix = ".Utils";
		var SCROLL_EVENT;
		if('onwheel' in document){
			SCROLL_EVENT = 'wheel' + _prefix
		} else if ('onmousewheel' in document){
			SCROLL_EVENT = 'mousewheel' + _prefix;
		} else {
			SCROLL_EVENT = 'DOMMouseScroll' + _prefix;
		}
		SCROLL_EVENT += " touchmove" + _prefix;
		$(target).off(SCROLL_EVENT);
	}

	/**
	 * スクロール停止解除
	 * 
	 * @param {object} target - jQuery Object
	 */
	static noScrollCancel(target) {
		var _prefix = ".Utils";
		var SCROLL_EVENT;
		if('onwheel' in document){
			SCROLL_EVENT = 'wheel' + _prefix
		} else if ('onmousewheel' in document){
			SCROLL_EVENT = 'mousewheel' + _prefix;
		} else {
			SCROLL_EVENT = 'DOMMouseScroll' + _prefix;
		}
		SCROLL_EVENT += " touchmove" + _prefix;
		$(target).off(SCROLL_EVENT);
	}

	// /**
	// * PC / SP 判定
	// * @return {bool} true = PC / false = SP
	// */
	// static isPc() {
	// 	var w = $(window).width();
	// 	return w > Config.breakPoint;
	// }

	/**
	 * ラジアンに変換
	 * 
	 * @param {number} degree - 角度
	 * @return {number} - ラジアン
	 */
	static radian(degree) {
		return degree * Math.PI / 180;
	}

	/**
	 * 角度に変換
	 * 
	 * @param {number} radian - ラジアン
	 * @return　{number} - 角度
	 */
	static angle(radian) {
		return radian * (180 / Math.PI);
	}

	/**
	 * ２点間の距離
	 * 
	 * @param {number}　x1
	 * @param {number}　y1
	 * @param {number}　x2
	 * @param {number}　y2
	 */
	static distance(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	}

	/**
	 * 値を範囲内におさめる
	 * 
	 * @param {number} val - 値
	 * @param {number} min - 最小値
	 * @param {number} max - 最小値
	 * @return {number}
	 */
	static clamp(val, min, max) {
		return Math.min(max, Math.max(val, min));
	}
	

	/**
	 * 値を範囲内におさめる
	 * 
	 * @param {number} val - 値
	 * @param {number} inputMin - 最小値
	 * @param {number} inputMax - 最大値
	 * @param {number} outputMin - Output最小値
	 * @param {number} outputMax - Output最大値
	 * @param {boolean} clamp - 最小値
	 * @return {number}
	 */
	static clamp2(val, inputMin , inputMax , outputMin , outputMax , clamp=true ) {
		let outVal = ((val - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
		if(clamp){
			if(outputMax < outputMin){
				if(outVal < outputMax){
					outVal = outputMax;
				} else if(outVal > outputMin){
					outVal = outputMin;
				}
			} else {
				if(outVal > outputMax){
					outVal = outputMax
				} else if(outVal < outputMin){
					outVal = outputMin
				}
			}
		}	
		return outVal
	}

	/**
	 * 線形補正
	 * 
	 * @param start - 開始位置
	 * @param end - 終了位置
	 * @param val - 実際の値
	 * @returns 
	 */
	static lerp(start, end, val) {
		return start + (end - start) * val
	}

	/**
	 * 2点間の距離から角度を求める（ラジアン）
	 * 
	 * @param {number}　x1
	 * @param {number}　y1
	 * @param {number}　x2
	 * @param {number}　y2
	 */
	static distanceRadian(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	}

	/**
	 * ランダムな数(float)
	 * 
	 * @param {number} min - 最小値(float)
	 * @param {number} max - 最大値(float)
	 * @return {number} min(含む)からmax(含む)までのランダムな数(float)
	 */
	static random(min, max) {
		return Math.random() * (max - min) + min;
	}


	/**
	 * coverPosition
	 * @param {number} wrapWidth - ラッパーコンテンツのwidth
	 * @param {number} wrapHeight - ラッパーコンテンツのheight
	 * @param {number} itemWidth - サイズ調整するオブジェクトのwidth
	 * @param {number} itemHeight - サイズ調整するオブジェクトのheight
	 * @return {object} top, left, width, height
	 */
	static coverPosition(wrapWidth, wrapHeight, itemWidth, itemHeight) {
		var wrapAspect = wrapWidth / wrapHeight;
		var itemAspect = itemWidth / itemHeight;

		if(itemAspect < wrapAspect){
			var _width = wrapWidth;
			var _height = wrapWidth / itemAspect;
		} else {
			var _width = wrapHeight * itemAspect;
			var _height = wrapHeight;
		}
		
		return {
			left   : (wrapWidth - _width) * 0.5,
			top    : (wrapHeight - _height) * 0.5,
			width  : _width,
			height : _height
		}
	}

	/**
	 * カンマをつける
	 * @param {number} value - 数値
	 * @return {number}
	 */
	static comma(value) {
		//https://web-designer.cman.jp/javascript_ref/keyboard/addcomma/

		// 入力されたカンマを消去
		var num = value.toString().replace(/,/g, "");
		
		// 『replace（正規表現指定）内容：(/^(-?\d+)(\d{3})/, "$1,$2")の説明』
		// ①＾：先頭から参照
		// ②(-?\d+)：１桁以上の数字（マイナスも可）　←　下記③を除いた数字
		// ③(\d{3})：数字３桁
		// ④$1：上記②が格納される
		// ⑤,（カンマ）：④と⑥の間に設定される
		// ⑥$2：上記③が格納される
		
		// 最上位桁まで下桁から３桁ごとにカンマ付加を繰り返す
		while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
		return num;
	}

	/**
	 * ボディーのスクロール固定
	 */
	static bodyFixedOn(){
		const ua = window.navigator.userAgent.toLowerCase();
		const isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;
		const body = document.querySelector('body');

		if(isiOS){
				scrollPosition = window.pageYOffset;
				body.style.position = 'fixed';
				body.style.top = `-${scrollPosition}px`;
		}else {
				body.style.overflow = 'hidden';
		}
	}

	/**
	 * ボディーのスクロール解除
	 */
	 static bodyFixedOff(){
		const ua = window.navigator.userAgent.toLowerCase();
		const isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;
		const body = document.querySelector('body');

		if(isiOS){
			const scrollPosition = parseFloat(body.style.top)
			body.style.removeProperty('position');
			body.style.removeProperty('top');
			window.scrollTo(0, scrollPosition);
		}else {
			body.style.removeProperty('overflow');
		}
	}
}