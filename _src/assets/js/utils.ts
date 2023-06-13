/**
 * Utils
 */

// /**
// * PC / SP 判定
// * @return {bool} true = PC / false = SP
// */
// export const isPc = ():boolean => {
// 	var w = $(window).width();
// 	return w > Config.breakPoint;
// }

/**
 * ラジアンに変換
 * 
 * @param {number} degree - 角度
 * @return {number} - ラジアン
 */
export const radian = (degree: number): number => {
	return degree * Math.PI / 180;
};

/**
 * 角度に変換
 * 
 * @param {number} radian - ラジアン
 * @return {number} - 角度
 */
export const angle = (radian: number): number => {
	return radian * (180 / Math.PI);
};

/**
 * 距離と角度から位置を求める
 * @param {number} x
 * @param {number} x
 * @param {number} distance
 * @param {number} radian
 */
export const distanceToPosition = (x: number, y: number, distance: number, radian: number): { x: number, y: number; } => {
	var x = x + distance * Math.cos(radian);
	var y = y + distance * Math.sin(radian);

	return {
		x: x,
		y: y,
	};
};
/**
 * ２点間の距離
 * 
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
export const distance = (x1: number, y1: number, x2: number, y2: number): number => {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

/**
 * 2点間の距離から角度を求める（ラジアン）
 * 
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
export const distanceRadian = (x1: number, y1: number, x2: number, y2: number): number => {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.atan2(dy, dx);
};

/**
 * 値を範囲内におさめる
 * 
 * @param {number} val - 値
 * @param {number} min - 最小値
 * @param {number} max - 最小値
 * @return {number}
 */
export const clamp = (val: number, min: number, max: number): number => {
	return Math.min(max, Math.max(val, min));
};


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
export const clamp2 = (val: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number, clamp: boolean = true): number => {
	let outVal = ((val - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
	if (clamp) {
		if (outputMax < outputMin) {
			if (outVal < outputMax) {
				outVal = outputMax;
			} else if (outVal > outputMin) {
				outVal = outputMin;
			}
		} else {
			if (outVal > outputMax) {
				outVal = outputMax;
			} else if (outVal < outputMin) {
				outVal = outputMin;
			}
		}
	}
	return outVal;
};

/**
 * 線形補正
 * 
 * @param current - 現在地
 * @param destination - 目的地
 * @param val - 実際の値
 * @returns 
 */
const lerp = (current: number, destination: number, val: number): number => {
	return current + (destination - current) * val;
};

/**
 * ランダムな数(float)
 * 
 * @param {number} min - 最小値(float)
 * @param {number} max - 最大値(float)
 * @return {number} min(含む)からmax(含む)までのランダムな数(float)
 */
const random = (min: number, max: number): number => {
	return Math.random() * (max - min) + min;
};


/**
 * coverPosition
 * @param {number} wrapWidth - ラッパーコンテンツのwidth
 * @param {number} wrapHeight - ラッパーコンテンツのheight
 * @param {number} itemWidth - サイズ調整するオブジェクトのwidth
 * @param {number} itemHeight - サイズ調整するオブジェクトのheight
 * @return {object} top, left, width, height
 */
const coverPosition = (wrapWidth: number, wrapHeight: number, itemWidth: number, itemHeight: number) => {
	var wrapAspect = wrapWidth / wrapHeight;
	var itemAspect = itemWidth / itemHeight;
	var _width, _height;

	if (itemAspect < wrapAspect) {
		_width = wrapWidth;
		_height = wrapWidth / itemAspect;
	} else {
		_width = wrapHeight * itemAspect;
		_height = wrapHeight;
	}

	return {
		left: (wrapWidth - _width) * 0.5,
		top: (wrapHeight - _height) * 0.5,
		width: _width,
		height: _height
	};
};
/**
 * viewport情報を返す
 */
export const viewport = () => {
	let width = window.innerWidth;
	let height = window.innerHeight;
	let aspectRatio = width / height;

	return { width, height, aspectRatio, };
};

/**
 * 画面のピクセルレシオを返す ただし2以上は2とみなす
 * @return {number} devicePixelRatio
 */
export const pixelRatio = () => {
	return window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1;
};

/**
 * ゼロ埋め
 * 
 * @param {number} val - 0埋めしたい値
 * @param {number} length - 桁数
 */
export const zeroReplace = (val: number, length: number): string => {
	return ('000000000' + (Math.ceil(val))).substr(-length);
};

/**
 * カンマをつける
 * @param {number} value - 数値
 * @return {string}
 */
export const comma = (value: number): string => {
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
	while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
	return num;
};

/**
 * 年月日の0埋め
 */
export const formattedDateTime = (date: Date = new Date()) => {
	const y = date.getFullYear();
	const m = ('0' + (date.getMonth() + 1)).slice(-2);
	const d = ('0' + date.getDate()).slice(-2);
	const h = ('0' + date.getHours()).slice(-2);
	// const mi = ('0' + date.getMinutes()).slice(-2);
	// const s = ('0' + date.getSeconds()).slice(-2);
	// return y + m + d + h + mi + s;
	return y + m + d + h;
};


/**
 * @param hex {string}
 * @returns number[r, g, b]
 */
export const hex2rgb = (hex: string): number[] => {
	if (hex.slice(0, 1) == "#") hex = hex.slice(1);
	if (hex.length == 3) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3);

	return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
		return parseInt(str, 16);
	});
};

/**
 * RGB → HSL
 */
export const rgb2hsl = (r, g, b) => {
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	const h = s
		? l === r
			? (g - b) / s
			: l === g
				? 2 + (b - r) / s
				: 4 + (r - g) / s
		: 0;
	return [
		60 * h < 0 ? 60 * h + 360 : 60 * h,
		100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
		(100 * (2 * l - s)) / 2,
	];
};

/**
 * HSL →　RGB
 */
export const hsl2rgb = (h, s, l) => {
	s /= 100;
	l /= 100;
	const k = n => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = n =>
		l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return [255 * f(0), 255 * f(8), 255 * f(4)];
};

/**
 * 1文字づつspanタグでくくる
 */
export const strSpanWrap = () => {
	const targets = document.querySelectorAll<HTMLElement>('.js_text_animation');
	if (targets.length > 0) {
		targets.forEach((target) => {
			let spanWrapText = "";
			target.childNodes.forEach((node) => {
				const n = node.cloneNode();

				if (n.nodeType == 3) {
					let text = n.textContent.replace(/\r?\n/g, '');
					text = text.replace(/\t/g, '');
					text.split("").forEach((str) => spanWrapText += `<span>${str}</span>`);
				} else {
					spanWrapText += (n as Element).outerHTML;
				}
			});
			target.innerHTML = spanWrapText;
		});
	};
};

/**
 * ファイルダイアログの使用
 * NOTE: 複数の拡張子を許容したい場合 (ex. "jpg|png")
 */
export const fileUp = async (extension: string): Promise<string | ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		document.body.appendChild(input);
		var reader = new FileReader();
		input.type = "file";

		// ファイル選択時
		const onInputChange = (e: Event) => {
			const file = (e.target as HTMLInputElement).files[0];
			const _extension = file.name.split(".")[1];
			const _checkList = extension.split("|");

			if (_checkList.indexOf(_extension) >= 0) {
				if (extension != 'json') { //NOTE: テキスト系は随時判定追加
					reader.readAsDataURL(file);
				} else {
					reader.readAsText(file);
				}
			} else {
				alert(`${extension}ファイルを入力してください`);
				reject(`${extension}ファイルを入力してください`);
			}
			document.body.removeChild(input);
			input.removeEventListener("change", onInputChange);
			input.remove();
		};

		// ファイル読み込みこみ
		const onLoadFile = (e: ProgressEvent<FileReader>) => {
			reader.removeEventListener("load", onLoadFile);
			resolve(e.target.result);
		};

		reader.addEventListener("load", onLoadFile);
		input.addEventListener("change", onInputChange);
		input.click();
	});
};

/**
 * jsonファイルDL
 */
export const jsonDL = (jsonStr: string, fileName: string) => {
	var a = document.createElement("a");
	var file = new Blob([jsonStr], { type: 'application/json' });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
	a.remove();
};