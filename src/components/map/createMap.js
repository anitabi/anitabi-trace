
import mapboxGl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'


import { streetsStyle } from './streetsStyle.js';
let localFontFamily = "'system-ui', sans-serif"; // 使用本地字体

// 判断是 iOS MacOS
if (/(iPhone|iPad|iPod|iOS|Mac OS X)/i.test(navigator.userAgent)) {
	localFontFamily = "'PingFang SC', sans-serif";
}


export const createMap = config=>{
	const map = new mapboxGl.Map({
		...config,
		style: streetsStyle,

		// 临时token 限制了 origin
		accessToken: 'pk.eyJ1IjoiaXRvcnIiLCJhIjoiY2x4Y2trYzNsMjJjYTJqcjAxM3hqdXB6OSJ9.cyCsL-wkCMZp_mKLnmKp7Q',
		worldview: 'CN',
		attributionControl: false,
		localFontFamily,
	});
	map.on('load', () => {
		map.addControl(new mapboxGl.NavigationControl(), 'bottom-right');
		// map.addControl(new mapboxGl.ScaleControl(), 'bottom-right');
	});
	return map
}

const { Marker } = mapboxGl;

export {
	Marker
};