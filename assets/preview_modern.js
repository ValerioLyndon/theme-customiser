// Preview-only HTML - replicating default functionality

function toggle( defaultDisplay = 'block' ){
	if( this.style.display === 'none' || this.style.display === '' ){
		this.style.display = defaultDisplay;
	}
	else {
		this.style.display = 'none';
	}
}

// Category buttons

var categoryButtons = document.getElementsByClassName('status-button');
var categoryNames = {
	7: 'All Anime',
	1: 'Currently Watching',
	2: 'Completed',
	3: 'On Hold',
	4: 'Dropped',
	6: 'Plan To Watch'
}
var categoryCodes = {
	7: 'all',
	1: 'current',
	2: 'completed',
	3: 'paused',
	4: 'dropped',
	6: 'planned'
}

function changeCategory( catId, catBtn ){
	if( !catBtn ){
		for( let button of categoryButtons ){
			if( button.href.includes(`status=${catId}`) ){
				catBtn = button;
			}
		}
	}
	
	// Change basic attributes
	document.body.setAttribute('data-query',`{"status":${catId}}`);
	document.querySelector('.status-button.on').classList.remove('on');
	catBtn.classList.add('on');
	document.getElementsByClassName('list-unit')[0].className = `list-unit ${catBtn.className.substring(14)}`;
	document.querySelector('.list-status-title .text').textContent = categoryNames[catId].toUpperCase();

	// Hide relevant list items
	let listItems = document.getElementsByClassName('list-item');

	for( let item of listItems ){
		if( catId == 7 || item.getAttribute('tc-category') === categoryCodes[catId] ){
			item.style = '';
		}
		else {
			item.style = 'display: none !important';
		}
	}
}
for( let button of categoryButtons ){
	button.addEventListener('click', () => {
		let catId = button.href.substring(button.href.length - 1);
		changeCategory(catId, button);
	});
}

// Fixed header

var statusMenu = document.getElementById('status-menu'),
	affixAtPos = statusMenu.getBoundingClientRect().y + window.scrollY;



window.addEventListener('scroll', () => {
	if( !statusMenu.className.includes('fixed') ){
		affixAtPos = statusMenu.getBoundingClientRect().y + window.scrollY;
	}

	if( window.scrollY >= affixAtPos ){
		statusMenu.classList.add('fixed');
	}
	else {
		statusMenu.classList.remove('fixed');
	}
})

// List Items

var items = document.getElementsByClassName('list-item');

for( var item of items ){
	// More button
	let more = item.getElementsByClassName('more-info')[0];
	item.querySelector('.more a').addEventListener('click', toggle.bind(more, 'table-row'));
}

// Filter overlay

let filterMenu = document.getElementById('advanced-options');
document.getElementById('advanced-options-button').addEventListener('click', () => {
	toggleMenu(filterMenu);
});
document.querySelector('#advanced-options #fancybox-close').addEventListener('click', () => {
	toggleMenu(filterMenu);
});
// This will have to be changed if edit/add button functionality is ever added since they share the fancybox-overlay
document.getElementById('fancybox-overlay').addEventListener('click', () => {
	toggleMenu(filterMenu);
});

function toggleMenu( dom ){
	let display = dom.style.display;
	if( !display || display === 'none' ){
		dom.style.display = 'block';
		toggleOverlay(true);
	}
	else {
		dom.style.display = 'none';
		toggleOverlay(false);
	}
}

let overlay = document.getElementById('fancybox-overlay');
function toggleOverlay( set = undefined ){
	let display = overlay.style.display;
	if( set === true || !display || display === 'none' ){
		overlay.style.display = 'block';
		overlay.style.opacity = '0.3';
		overlay.style.backgroundColor = 'rgb(102, 102, 102)';
	}
	else {
		overlay.style.display = 'none';
	}
}

let listMenuInner = `<a class="icon-menu profile" href="https://myanimelist.net/profile/Example" style="background-image: url(../../images/avatar.jpg);" onclick="return false;">
        </a>
        <a class="icon-menu quick-add List_LightBox" href="https://myanimelist.net/addtolist.php?hidenav=1" onclick="return false;">
          <svg class="icon icon-quick-add" width="22px" height="20px" viewBox="0 0 22 20" version="1.1">
            <g>
              <path d="M2.03247939,20 C2.60302963,20 3.07792381,19.8093076 3.47663177,19.4074915 C3.87618623,19.0065267 4.0658053,18.5093644 4.0658053,17.9364359 C4.0658053,17.3822361 3.87618623,16.9046538 3.47663177,16.5028377 C3.07792381,16.1018729 2.60302963,15.9111805 2.03247939,15.9111805 C1.46277567,15.9111805 0.987881488,16.1018729 0.588327022,16.5028377 C0.189619069,16.9046538 0,17.3822361 0,17.9364359 C0,18.5093644 0.189619069,19.0065267 0.588327022,19.4074915 C0.987881488,19.8093076 1.46277567,20 2.03247939,20 L2.03247939,20 Z M2.03247939,14.5354711 C2.60302963,14.5354711 3.07792381,14.3439274 3.47663177,13.9429625 C3.87618623,13.5411464 4.0658053,13.0448354 4.0658053,12.4710556 C4.0658053,11.9168558 3.87618623,11.4392736 3.47663177,11.0383087 C3.07792381,10.6373439 2.60302963,10.4458002 2.03247939,10.4458002 C1.46277567,10.4458002 0.987881488,10.6373439 0.588327022,11.0383087 C0.189619069,11.4392736 0,11.9168558 0,12.4710556 C0,13.0448354 0.189619069,13.5411464 0.588327022,13.9429625 C0.987881488,14.3439274 1.46277567,14.5354711 2.03247939,14.5354711 L2.03247939,14.5354711 Z M2.03247939,9.08881952 C2.60302963,9.08881952 3.07792381,8.89812713 3.47663177,8.49716232 C3.87618623,8.0953462 4.0658053,7.59903519 4.0658053,7.04483541 C4.0658053,6.47105562 3.87618623,5.99347333 3.47663177,5.59250851 C3.07792381,5.1915437 2.60302963,5 2.03247939,5 C1.46277567,5 0.987881488,5.1915437 0.588327022,5.59250851 C0.189619069,5.99347333 0,6.47105562 0,7.04483541 C0,7.59903519 0.189619069,8.0953462 0.588327022,8.49716232 C0.987881488,8.89812713 1.46277567,9.08881952 2.03247939,9.08881952 L2.03247939,9.08881952 Z M5.52858098,19.2167991 C5.60476721,19.2738365 5.68095344,19.3121453 5.77576298,19.3121453 L18.6580085,19.3121453 C18.7536645,19.3121453 18.8290042,19.2738365 18.9051905,19.2167991 C18.9619069,19.1401816 19,19.0635641 19,18.9682179 L19,16.9233825 C19,16.8280363 18.9619069,16.7514188 18.9051905,16.6748014 C18.8290042,16.6177639 18.7536645,16.5794552 18.6580085,16.5794552 L5.77576298,16.5794552 C5.68095344,16.5794552 5.60476721,16.6177639 5.52858098,16.6748014 C5.45239474,16.7514188 5.43377144,16.8280363 5.43377144,16.9233825 L5.43377144,18.9682179 C5.43377144,19.0635641 5.45239474,19.1401816 5.52858098,19.2167991 L5.52858098,19.2167991 Z M5.52858098,13.7514188 C5.60476721,13.8093076 5.68095344,13.846765 5.77576298,13.846765 L18.6580085,13.846765 C18.7536645,13.846765 18.8290042,13.8093076 18.9051905,13.7514188 C18.9619069,13.6748014 19,13.5990352 19,13.5028377 L19,11.4588536 C19,11.3635074 18.9619069,11.2868899 18.9051905,11.2102724 C18.8290042,11.153235 18.7536645,11.1149262 18.6580085,11.1149262 L5.77576298,11.1149262 C5.68095344,11.1149262 5.60476721,11.153235 5.52858098,11.2102724 C5.45239474,11.2868899 5.43377144,11.3635074 5.43377144,11.4588536 L5.43377144,13.5028377 C5.43377144,13.5990352 5.45239474,13.6748014 5.52858098,13.7514188 L5.52858098,13.7514188 Z M10.8026738,8.09158253 C10.7995282,8.17185089 10.7855079,8.2384072 10.7658153,8.30561862 C10.7356604,8.36350738 10.7058407,8.40096481 10.6679796,8.40096481 L5.56913312,8.40096481 C5.53160711,8.40096481 5.50145228,8.36350738 5.47129745,8.30561862 C5.44114262,8.22900114 5.43377144,8.15323496 5.43377144,8.05703746 L5.43377144,6.01305335 C5.43377144,5.91770715 5.44114262,5.84108967 5.47129745,5.76447219 C5.50145228,5.70743473 5.53160711,5.66912599 5.56913312,5.66912599 L10.6679796,5.66912599 C10.7058407,5.66912599 10.7356604,5.70743473 10.7658153,5.76447219 C10.7882639,5.84108967 10.8033413,5.91770715 10.8033413,6.01305335 L10.8033413,7.06105502 L14.3461796,7.06105502 L14.3461796,8.09158253 L10.8026733,8.09158253 Z M18,7 L19,7 L19,8 L18,8 L18,7 Z" id="Fill-125"></path>
              <path d="M12.4669412,5.96329412 L15.2241176,5.96329412 L15.2241176,8.72047059 C15.2241176,8.89888235 15.2834118,9.05294118 15.4141765,9.17205882 C15.5327647,9.30282353 15.6873529,9.36211765 15.8657647,9.36211765 L17.1374118,9.36211765 C17.3036471,9.36211765 17.4577059,9.30282353 17.5768235,9.17205882 C17.7075882,9.05294118 17.7668824,8.89888235 17.7668824,8.72047059 L17.7668824,5.96329412 L20.5240588,5.96329412 C20.7019412,5.96329412 20.8565294,5.904 20.9756471,5.77323529 C21.1058824,5.65464706 21.1657059,5.50005882 21.1657059,5.32164706 L21.1657059,4.05052941 C21.1657059,3.88376471 21.1058824,3.72970588 20.9756471,3.61058824 C20.8565294,3.47982353 20.7019412,3.42052941 20.5240588,3.42052941 L17.7668824,3.42052941 L17.7668824,0.663882353 C17.7668824,0.485470588 17.7075882,0.330882353 17.5768235,0.212294118 C17.4577059,0.0815294118 17.3036471,0.0222352941 17.1374118,0.0222352941 L15.8657647,0.0222352941 C15.6873529,0.0222352941 15.5327647,0.0815294118 15.4141765,0.212294118 C15.2834118,0.330882353 15.2241176,0.485470588 15.2241176,0.663882353 L15.2241176,3.42052941 L12.4669412,3.42052941 C12.2890588,3.42052941 12.1344706,3.47982353 12.0153529,3.61058824 C11.8851176,3.72970588 11.8252941,3.88376471 11.8252941,4.05052941 L11.8252941,5.32164706 C11.8252941,5.50005882 11.8851176,5.65464706 12.0153529,5.77323529 C12.1344706,5.904 12.2890588,5.96329412 12.4669412,5.96329412 Z" id="Fill-41"></path>
            </g>
          </svg>
          <span class="text">Quick Add</span>
        </a>
        <a class="icon-menu anime-list" href="https://myanimelist.net/animelist/Example?" onclick="return false;">
          <svg class="icon icon-anime-list" width="22px" height="20px" viewBox="0 0 22 20" version="1.1">
            <g>
              <path d="M2.20234783,18.8926957 C2.75913043,18.8926957 3.22256522,18.7076522 3.61165217,18.3177391 C4.00156522,17.9286522 4.1866087,17.4462174 4.1866087,16.8902609 C4.1866087,16.3524783 4.00156522,15.8890435 3.61165217,15.4991304 C3.22256522,15.1100435 2.75913043,14.925 2.20234783,14.925 C1.6463913,14.925 1.18295652,15.1100435 0.793043478,15.4991304 C0.403956522,15.8890435 0.218913043,16.3524783 0.218913043,16.8902609 C0.218913043,17.4462174 0.403956522,17.9286522 0.793043478,18.3177391 C1.18295652,18.7076522 1.6463913,18.8926957 2.20234783,18.8926957 L2.20234783,18.8926957 Z M2.20234783,13.5900435 C2.75913043,13.5900435 3.22256522,13.4041739 3.61165217,13.015087 C4.00156522,12.6251739 4.1866087,12.1435652 4.1866087,11.5867826 C4.1866087,11.049 4.00156522,10.5855652 3.61165217,10.1964783 C3.22256522,9.8073913 2.75913043,9.62152174 2.20234783,9.62152174 C1.6463913,9.62152174 1.18295652,9.8073913 0.793043478,10.1964783 C0.403956522,10.5855652 0.218913043,11.049 0.218913043,11.5867826 C0.218913043,12.1435652 0.403956522,12.6251739 0.793043478,13.015087 C1.18295652,13.4041739 1.6463913,13.5900435 2.20234783,13.5900435 L2.20234783,13.5900435 Z M2.20234783,8.30473913 C2.75913043,8.30473913 3.22256522,8.11969565 3.61165217,7.7306087 C4.00156522,7.34069565 4.1866087,6.85908696 4.1866087,6.32130435 C4.1866087,5.76452174 4.00156522,5.30108696 3.61165217,4.912 C3.22256522,4.52291304 2.75913043,4.33704348 2.20234783,4.33704348 C1.6463913,4.33704348 1.18295652,4.52291304 0.793043478,4.912 C0.403956522,5.30108696 0.218913043,5.76452174 0.218913043,6.32130435 C0.218913043,6.85908696 0.403956522,7.34069565 0.793043478,7.7306087 C1.18295652,8.11969565 1.6463913,8.30473913 2.20234783,8.30473913 L2.20234783,8.30473913 Z M5.61408696,18.1326957 C5.68843478,18.1880435 5.76278261,18.2252174 5.85530435,18.2252174 L18.4266957,18.2252174 C18.5200435,18.2252174 18.5935652,18.1880435 18.667913,18.1326957 C18.7232609,18.0583478 18.7604348,17.984 18.7604348,17.8914783 L18.7604348,15.9072174 C18.7604348,15.8146957 18.7232609,15.7403478 18.667913,15.666 C18.5935652,15.6106522 18.5200435,15.5734783 18.4266957,15.5734783 L5.85530435,15.5734783 C5.76278261,15.5734783 5.68843478,15.6106522 5.61408696,15.666 C5.53973913,15.7403478 5.52156522,15.8146957 5.52156522,15.9072174 L5.52156522,17.8914783 C5.52156522,17.984 5.53973913,18.0583478 5.61408696,18.1326957 L5.61408696,18.1326957 Z M5.61408696,12.8292174 C5.68843478,12.8853913 5.76278261,12.9217391 5.85530435,12.9217391 L18.4266957,12.9217391 C18.5200435,12.9217391 18.5935652,12.8853913 18.667913,12.8292174 C18.7232609,12.7548696 18.7604348,12.6813478 18.7604348,12.588 L18.7604348,10.6045652 C18.7604348,10.5120435 18.7232609,10.4376957 18.667913,10.3633478 C18.5935652,10.308 18.5200435,10.2708261 18.4266957,10.2708261 L5.85530435,10.2708261 C5.76278261,10.2708261 5.68843478,10.308 5.61408696,10.3633478 C5.53973913,10.4376957 5.52156522,10.5120435 5.52156522,10.6045652 L5.52156522,12.588 C5.52156522,12.6813478 5.53973913,12.7548696 5.61408696,12.8292174 L5.61408696,12.8292174 Z M5.56517435,7.54473913 C5.6002174,7.60091304 5.63526046,7.63726087 5.67886959,7.63726087 L11.6042606,7.63726087 C11.6482591,7.63726087 11.6829128,7.60091304 11.7179559,7.54473913 C11.7440435,7.4703913 11.761565,7.39686957 11.761565,7.30352174 L11.761565,5.32008696 C11.761565,5.22756522 11.7440435,5.15321739 11.7179559,5.07886957 C11.6829128,5.02352174 11.6482591,4.98634783 11.6042606,4.98634783 L5.67886959,4.98634783 C5.63526046,4.98634783 5.6002174,5.02352174 5.56517435,5.07886957 C5.5301313,5.15321739 5.52156522,5.22756522 5.52156522,5.32008696 L5.52156522,7.30352174 C5.52156522,7.39686957 5.5301313,7.4703913 5.56517435,7.54473913 L5.56517435,7.54473913 Z" id="Fill-125"></path>
              <path d="M15.0024414,5.50830078 L17.0112305,5.50830078 L16.0229492,2.39306641 L15.0024414,5.50830078 Z M15.1044922,0.583007812 L16.9736328,0.583007812 L19.7773438,8.5 L17.9833984,8.5 L17.4731445,6.87255859 L14.5566406,6.87255859 L14.0087891,8.5 L12.2792969,8.5 L15.1044922,0.583007812 Z" id="A"></path>
            </g>
          </svg>
          <span class="text">Anime List</span>
        </a>
        <a class="icon-menu manga-list" href="https://myanimelist.net/mangalist/Example?" onclick="return false;">
          <svg class="icon icon-manga-list" width="22px" height="20px" viewBox="0 0 22 20" version="1.1">
            <g>
              <path d="M2.20234783,18.8926957 C2.75913043,18.8926957 3.22256522,18.7076522 3.61165217,18.3177391 C4.00156522,17.9286522 4.1866087,17.4462174 4.1866087,16.8902609 C4.1866087,16.3524783 4.00156522,15.8890435 3.61165217,15.4991304 C3.22256522,15.1100435 2.75913043,14.925 2.20234783,14.925 C1.6463913,14.925 1.18295652,15.1100435 0.793043478,15.4991304 C0.403956522,15.8890435 0.218913043,16.3524783 0.218913043,16.8902609 C0.218913043,17.4462174 0.403956522,17.9286522 0.793043478,18.3177391 C1.18295652,18.7076522 1.6463913,18.8926957 2.20234783,18.8926957 L2.20234783,18.8926957 Z M2.20234783,13.5900435 C2.75913043,13.5900435 3.22256522,13.4041739 3.61165217,13.015087 C4.00156522,12.6251739 4.1866087,12.1435652 4.1866087,11.5867826 C4.1866087,11.049 4.00156522,10.5855652 3.61165217,10.1964783 C3.22256522,9.8073913 2.75913043,9.62152174 2.20234783,9.62152174 C1.6463913,9.62152174 1.18295652,9.8073913 0.793043478,10.1964783 C0.403956522,10.5855652 0.218913043,11.049 0.218913043,11.5867826 C0.218913043,12.1435652 0.403956522,12.6251739 0.793043478,13.015087 C1.18295652,13.4041739 1.6463913,13.5900435 2.20234783,13.5900435 L2.20234783,13.5900435 Z M2.20234783,8.30473913 C2.75913043,8.30473913 3.22256522,8.11969565 3.61165217,7.7306087 C4.00156522,7.34069565 4.1866087,6.85908696 4.1866087,6.32130435 C4.1866087,5.76452174 4.00156522,5.30108696 3.61165217,4.912 C3.22256522,4.52291304 2.75913043,4.33704348 2.20234783,4.33704348 C1.6463913,4.33704348 1.18295652,4.52291304 0.793043478,4.912 C0.403956522,5.30108696 0.218913043,5.76452174 0.218913043,6.32130435 C0.218913043,6.85908696 0.403956522,7.34069565 0.793043478,7.7306087 C1.18295652,8.11969565 1.6463913,8.30473913 2.20234783,8.30473913 L2.20234783,8.30473913 Z M5.61408696,18.1326957 C5.68843478,18.1880435 5.76278261,18.2252174 5.85530435,18.2252174 L18.4266957,18.2252174 C18.5200435,18.2252174 18.5935652,18.1880435 18.667913,18.1326957 C18.7232609,18.0583478 18.7604348,17.984 18.7604348,17.8914783 L18.7604348,15.9072174 C18.7604348,15.8146957 18.7232609,15.7403478 18.667913,15.666 C18.5935652,15.6106522 18.5200435,15.5734783 18.4266957,15.5734783 L5.85530435,15.5734783 C5.76278261,15.5734783 5.68843478,15.6106522 5.61408696,15.666 C5.53973913,15.7403478 5.52156522,15.8146957 5.52156522,15.9072174 L5.52156522,17.8914783 C5.52156522,17.984 5.53973913,18.0583478 5.61408696,18.1326957 L5.61408696,18.1326957 Z M5.61408696,12.8292174 C5.68843478,12.8853913 5.76278261,12.9217391 5.85530435,12.9217391 L18.4266957,12.9217391 C18.5200435,12.9217391 18.5935652,12.8853913 18.667913,12.8292174 C18.7232609,12.7548696 18.7604348,12.6813478 18.7604348,12.588 L18.7604348,10.6045652 C18.7604348,10.5120435 18.7232609,10.4376957 18.667913,10.3633478 C18.5935652,10.308 18.5200435,10.2708261 18.4266957,10.2708261 L5.85530435,10.2708261 C5.76278261,10.2708261 5.68843478,10.308 5.61408696,10.3633478 C5.53973913,10.4376957 5.52156522,10.5120435 5.52156522,10.6045652 L5.52156522,12.588 C5.52156522,12.6813478 5.53973913,12.7548696 5.61408696,12.8292174 L5.61408696,12.8292174 Z M5.56517435,7.54473913 C5.6002174,7.60091304 5.63526046,7.63726087 5.67886959,7.63726087 L11.6042606,7.63726087 C11.6482591,7.63726087 11.6829128,7.60091304 11.7179559,7.54473913 C11.7440435,7.4703913 11.761565,7.39686957 11.761565,7.30352174 L11.761565,5.32008696 C11.761565,5.22756522 11.7440435,5.15321739 11.7179559,5.07886957 C11.6829128,5.02352174 11.6482591,4.98634783 11.6042606,4.98634783 L5.67886959,4.98634783 C5.63526046,4.98634783 5.6002174,5.02352174 5.56517435,5.07886957 C5.5301313,5.15321739 5.52156522,5.22756522 5.52156522,5.32008696 L5.52156522,7.30352174 C5.52156522,7.39686957 5.5301313,7.4703913 5.56517435,7.54473913 L5.56517435,7.54473913 Z" id="Fill-125"></path>
              <path d="M18.0854492,0.583007812 L20.4648438,0.583007812 L20.4648438,8.5 L18.9233398,8.5 L18.9233398,3.14501953 C18.9233398,2.99104741 18.9251302,2.77531063 18.9287109,2.49780273 C18.9322917,2.22029484 18.934082,2.00634841 18.934082,1.85595703 L17.4355469,8.5 L15.8295898,8.5 L14.3417969,1.85595703 C14.3417969,2.00634841 14.3435872,2.22029484 14.347168,2.49780273 C14.3507487,2.77531063 14.3525391,2.99104741 14.3525391,3.14501953 L14.3525391,8.5 L12.8110352,8.5 L12.8110352,0.583007812 L15.2172852,0.583007812 L16.6567383,6.80810547 L18.0854492,0.583007812 Z" id="M"></path>
            </g>
          </svg>
          <span class="text">Manga List</span>
        </a>
        <a class="icon-menu history" href="https://myanimelist.net/history/Example" onclick="return false;">
          <svg class="icon icon-history" width="21px" height="21px" viewBox="0 0 21 21" version="1.1">
            <g transform="translate(-1.000000, -154.000000)">
              <path d="M2.115,162.749 C2.272,162.906 2.452,162.996 2.676,162.996 L8.288,162.996 C8.647,162.996 8.894,162.817 9.028,162.48 C9.163,162.166 9.118,161.874 8.849,161.627 L7.143,159.899 C7.726,159.338 8.4,158.911 9.141,158.619 C9.904,158.328 10.689,158.17 11.497,158.17 C12.373,158.17 13.181,158.35 13.966,158.687 C14.774,159.023 15.448,159.472 16.031,160.056 C16.593,160.639 17.041,161.313 17.378,162.098 C17.715,162.884 17.894,163.715 17.894,164.59 C17.894,165.465 17.715,166.296 17.378,167.081 C17.041,167.867 16.593,168.54 16.031,169.124 C15.448,169.685 14.774,170.134 13.966,170.471 C13.181,170.807 12.373,170.987 11.497,170.987 C10.51,170.987 9.567,170.762 8.669,170.336 C7.794,169.91 7.053,169.303 6.447,168.518 C6.38,168.428 6.29,168.383 6.155,168.361 C6.021,168.361 5.908,168.406 5.841,168.473 L4.113,170.201 C4.045,170.269 4.023,170.358 4.023,170.448 C4,170.56 4.045,170.65 4.09,170.74 C5.01,171.84 6.11,172.693 7.412,173.299 C8.692,173.905 10.061,174.197 11.497,174.197 C12.799,174.197 14.034,173.95 15.223,173.433 C16.413,172.917 17.423,172.244 18.298,171.391 C19.151,170.516 19.825,169.505 20.341,168.316 C20.857,167.126 21.104,165.892 21.104,164.59 C21.104,163.288 20.857,162.054 20.341,160.864 C19.825,159.674 19.151,158.642 18.298,157.789 C17.423,156.913 16.413,156.24 15.223,155.724 C14.034,155.208 12.799,154.961 11.497,154.961 C10.263,154.961 9.073,155.185 7.928,155.657 C6.784,156.128 5.774,156.779 4.876,157.609 L3.237,155.993 C2.99,155.746 2.699,155.679 2.384,155.836 C2.048,155.971 1.868,156.218 1.868,156.577 L1.868,162.188 C1.868,162.413 1.958,162.592 2.115,162.749 L2.115,162.749 Z M8.4,166.879 C8.467,166.947 8.579,166.992 8.692,166.992 L12.687,166.992 C12.799,166.992 12.911,166.947 12.979,166.879 C13.046,166.812 13.091,166.7 13.091,166.588 L13.091,160.999 C13.091,160.886 13.046,160.774 12.979,160.707 C12.911,160.639 12.799,160.595 12.687,160.595 L11.901,160.595 C11.789,160.595 11.677,160.639 11.61,160.707 C11.542,160.774 11.497,160.886 11.497,160.999 L11.497,165.398 L8.692,165.398 C8.579,165.398 8.467,165.443 8.4,165.51 C8.332,165.577 8.288,165.69 8.288,165.802 L8.288,166.588 C8.288,166.7 8.332,166.812 8.4,166.879 L8.4,166.879 Z" id="icon_menu_side_history" sketch:type="MSShapeGroup"></path>
            </g>
          </svg>
          <span class="text">History</span>
        </a>
        <a class="icon-menu export" href="https://myanimelist.net/panel.php?go=export" onclick="return false;">
          <svg class="icon icon-export" width="21px" height="24px" viewBox="0 0 21 24" version="1.1">
            <g transform="translate(0.000000, -253.000000)">
              <path d="M1.229,275.994 C1.454,276.24 1.745,276.353 2.082,276.353 L18.916,276.353 C19.231,276.353 19.522,276.24 19.769,275.994 C19.994,275.769 20.106,275.477 20.106,275.141 L20.106,261.92 L13.305,261.92 C12.968,261.92 12.676,261.808 12.452,261.561 C12.205,261.337 12.093,261.045 12.093,260.708 L12.093,253.907 L2.082,253.907 C1.745,253.907 1.454,254.019 1.229,254.244 C0.982,254.491 0.87,254.783 0.87,255.097 L0.87,275.141 C0.87,275.477 0.982,275.769 1.229,275.994 L1.229,275.994 Z M19.612,260.326 C19.5,260.124 19.365,259.99 19.253,259.855 L14.158,254.76 C14.023,254.648 13.888,254.513 13.686,254.401 L13.686,260.326 L19.612,260.326 L19.612,260.326 Z" id="icon_menu_side_export" sketch:type="MSShapeGroup"></path>
            </g>
          </svg>
          <span class="text">Export</span>
        </a>
        <form action="https://myanimelist.net/logout.php" method="post">
          <a class="icon-menu logout" href="javascript:void(0);" onclick="$(this).parent().submit();" onclick="return false;">
            <svg class="icon icon-logout" width="20px" height="17px" viewBox="0 0 20 17" version="1.1">
              <g transform="translate(-2.000000, -306.000000)">
                <path d="M3.121,321.395 C3.817,322.091 4.67,322.45 5.658,322.45 L9.676,322.45 C9.788,322.45 9.878,322.428 9.923,322.36 C9.99,322.315 10.035,322.226 10.057,322.136 C10.08,322.024 10.08,321.911 10.102,321.844 C10.102,321.754 10.102,321.642 10.08,321.507 L10.08,321.26 C10.08,321.193 10.057,321.126 10.057,321.081 C10.035,321.036 10.012,321.013 9.967,320.969 C9.923,320.946 9.878,320.924 9.855,320.901 C9.833,320.879 9.788,320.879 9.721,320.879 C9.653,320.856 9.608,320.856 9.563,320.856 L9.406,320.856 L9.272,320.856 L5.658,320.856 C5.119,320.856 4.648,320.654 4.244,320.273 C3.862,319.869 3.66,319.397 3.66,318.859 L3.66,310.015 C3.66,309.476 3.862,309.005 4.244,308.601 C4.648,308.219 5.119,308.017 5.658,308.017 L9.676,308.017 C9.788,308.017 9.878,307.995 9.923,307.928 C9.99,307.883 10.035,307.793 10.057,307.703 C10.08,307.591 10.08,307.479 10.102,307.411 C10.102,307.322 10.102,307.209 10.08,307.075 L10.08,306.828 C10.08,306.716 10.035,306.626 9.945,306.536 C9.878,306.469 9.788,306.424 9.676,306.424 L5.658,306.424 C4.67,306.424 3.817,306.783 3.121,307.479 C2.426,308.197 2.066,309.027 2.066,310.038 L2.066,318.836 C2.066,319.846 2.426,320.677 3.121,321.395 L3.121,321.395 Z M7.117,317.4 C7.274,317.557 7.454,317.647 7.678,317.647 L13.289,317.647 L13.289,321.238 C13.289,321.462 13.379,321.642 13.536,321.799 C13.693,321.956 13.873,322.046 14.097,322.046 C14.299,322.046 14.501,321.956 14.659,321.799 L21.46,314.998 C21.617,314.841 21.707,314.661 21.707,314.437 C21.707,314.212 21.617,314.033 21.46,313.876 L14.659,307.075 C14.501,306.918 14.299,306.828 14.097,306.828 C13.873,306.828 13.693,306.918 13.536,307.075 C13.379,307.232 13.289,307.411 13.289,307.636 L13.289,311.227 L7.678,311.227 C7.454,311.227 7.274,311.317 7.117,311.474 C6.96,311.631 6.87,311.811 6.87,312.035 L6.87,316.839 C6.87,317.063 6.96,317.243 7.117,317.4 L7.117,317.4 Z" id="icon_menu_side_logout" sketch:type="MSShapeGroup"></path>
              </g>
            </svg>
            <span class="text">Logout</span>
          </a>
        </form>
        <div class="icon-menu setting">
          <svg class="icon icon-setting" width="21px" height="24px" viewBox="0 0 21 24" version="1.1">
            <g transform="translate(-1.000000, -402.000000)">
              <path d="M1.958,414.151 C2.025,414.241 2.115,414.286 2.227,414.308 L4.517,414.645 C4.652,415.049 4.809,415.476 5.033,415.88 C4.898,416.104 4.674,416.396 4.36,416.778 C4.068,417.159 3.844,417.428 3.731,417.608 C3.664,417.698 3.619,417.788 3.619,417.9 C3.619,418.012 3.664,418.102 3.709,418.192 C4.046,418.641 4.719,419.336 5.774,420.279 C5.864,420.391 5.976,420.436 6.088,420.436 C6.223,420.436 6.313,420.391 6.402,420.324 L8.176,418.977 C8.512,419.157 8.894,419.291 9.298,419.426 L9.657,421.738 C9.657,421.85 9.724,421.94 9.792,422.007 C9.882,422.075 9.994,422.12 10.106,422.12 L12.889,422.12 C13.136,422.12 13.271,422.007 13.338,421.76 C13.45,421.356 13.563,420.571 13.697,419.426 C14.079,419.314 14.46,419.157 14.819,418.955 L16.548,420.324 C16.66,420.391 16.772,420.436 16.884,420.436 C17.064,420.436 17.446,420.122 18.052,419.538 C18.658,418.932 19.084,418.483 19.309,418.192 C19.376,418.102 19.421,418.012 19.421,417.9 C19.421,417.788 19.376,417.675 19.286,417.586 C18.68,416.845 18.231,416.261 17.939,415.857 C18.119,415.543 18.276,415.161 18.433,414.713 L20.745,414.353 C20.857,414.353 20.947,414.286 21.014,414.196 C21.082,414.106 21.104,414.017 21.104,413.904 L21.104,411.144 C21.104,411.031 21.082,410.942 21.014,410.852 C20.947,410.762 20.857,410.717 20.745,410.695 L18.456,410.336 C18.321,409.932 18.141,409.528 17.939,409.124 C18.074,408.899 18.299,408.607 18.613,408.226 C18.905,407.844 19.129,407.575 19.241,407.395 C19.309,407.305 19.354,407.216 19.354,407.103 C19.354,406.991 19.309,406.901 19.264,406.834 C18.949,406.408 18.276,405.689 17.199,404.702 C17.086,404.612 16.997,404.567 16.884,404.567 C16.75,404.567 16.66,404.612 16.57,404.679 L14.797,406.026 C14.46,405.846 14.079,405.712 13.675,405.577 L13.338,403.265 C13.338,403.153 13.271,403.063 13.203,402.996 C13.114,402.929 13.001,402.884 12.889,402.884 L10.106,402.884 C9.859,402.884 9.724,402.996 9.657,403.243 C9.545,403.647 9.433,404.432 9.298,405.577 C8.894,405.689 8.512,405.846 8.153,406.048 L6.425,404.702 C6.313,404.612 6.2,404.567 6.088,404.567 C5.909,404.567 5.505,404.881 4.898,405.465 C4.293,406.071 3.888,406.52 3.664,406.812 C3.597,406.924 3.552,407.036 3.552,407.103 C3.552,407.216 3.597,407.305 3.686,407.418 C4.248,408.091 4.696,408.675 5.033,409.146 C4.809,409.528 4.652,409.909 4.539,410.291 L2.205,410.65 C2.115,410.65 2.025,410.717 1.958,410.807 C1.891,410.897 1.868,410.987 1.868,411.099 L1.868,413.86 C1.868,413.972 1.891,414.062 1.958,414.151 L1.958,414.151 Z M11.498,409.303 C12.373,409.303 13.136,409.617 13.765,410.246 C14.371,410.874 14.685,411.615 14.685,412.49 C14.685,413.388 14.371,414.129 13.765,414.757 C13.136,415.386 12.373,415.7 11.498,415.7 C10.622,415.7 9.859,415.386 9.231,414.757 C8.602,414.129 8.288,413.388 8.288,412.49 C8.288,411.615 8.602,410.874 9.231,410.246 C9.859,409.617 10.622,409.303 11.498,409.303 L11.498,409.303 Z" id="icon_menu_side_setting" sketch:type="MSShapeGroup"></path>
            </g>
          </svg>
          <span class="text">
            <a class="link-list-setting" href="https://myanimelist.net/editprofile.php?go=listpreferences" onclick="return false;">List Settings</a>
            <a class="link-style-setting" href="https://myanimelist.net/ownlist/style" onclick="return false;">Style Settings</a>
          </span>
        </div>`;

function setView( view ){
	// setup HTML variables

	let header = document.querySelector('.header'),
		headerMenu = header.querySelector('.header-menu'),
		listMenu = document.querySelector('.list-menu-float'),
		itemBtns = document.querySelectorAll('.add-edit-more span:first-child');

	// Apply changes as required

	if( view === 'owner' ){
		document.body.setAttribute('data-owner', 1);
		
		headerMenu.innerHTML = `<div class="btn-menu">
          Viewing <span class="username">Your</span> Anime List
        </div>`;
		headerMenu.classList.remove('other');

		if( !listMenu ){
			let div = document.createElement('div');
			div.className = 'list-menu-float';
			div.innerHTML = listMenuInner;
			listMenu = div;
			document.body.insertBefore(listMenu, document.getElementById('list-container'));
		}
		else {
			listMenu.innerHTML = listMenuInner;
		}
		
		for( btn of itemBtns ){
			btn.className = 'edit';
			btn.firstChild.textContent = 'Edit';
		}
	}

	else if( view.startsWith('visitor') ){
		document.body.setAttribute('data-owner', '');

		headerMenu.innerHTML = `<div class="btn-menu">Viewing <a class="username" href="/profile/Example" onclick="return false;">Example</a>'s
          <a href="javascript: void(0);" id="header-menu-button" onclick="return false;">
            Anime List
            <i class="fa-regular fa-angle-down"></i>
          </a>
        </div>

		  <div class="header-info"></div>

		  <div id="header-menu-dropdown" class="list-menu">
                      <a class="icon-menu manga-list" href="/mangalist/Example" onclick="return false;">
              <svg class="icon icon-manga-list" width="22px" height="20px" viewBox="0 0 22 20" version="1.1">
                <g>
                  <path d="M2.20234783,18.8926957 C2.75913043,18.8926957 3.22256522,18.7076522 3.61165217,18.3177391 C4.00156522,17.9286522 4.1866087,17.4462174 4.1866087,16.8902609 C4.1866087,16.3524783 4.00156522,15.8890435 3.61165217,15.4991304 C3.22256522,15.1100435 2.75913043,14.925 2.20234783,14.925 C1.6463913,14.925 1.18295652,15.1100435 0.793043478,15.4991304 C0.403956522,15.8890435 0.218913043,16.3524783 0.218913043,16.8902609 C0.218913043,17.4462174 0.403956522,17.9286522 0.793043478,18.3177391 C1.18295652,18.7076522 1.6463913,18.8926957 2.20234783,18.8926957 L2.20234783,18.8926957 Z M2.20234783,13.5900435 C2.75913043,13.5900435 3.22256522,13.4041739 3.61165217,13.015087 C4.00156522,12.6251739 4.1866087,12.1435652 4.1866087,11.5867826 C4.1866087,11.049 4.00156522,10.5855652 3.61165217,10.1964783 C3.22256522,9.8073913 2.75913043,9.62152174 2.20234783,9.62152174 C1.6463913,9.62152174 1.18295652,9.8073913 0.793043478,10.1964783 C0.403956522,10.5855652 0.218913043,11.049 0.218913043,11.5867826 C0.218913043,12.1435652 0.403956522,12.6251739 0.793043478,13.015087 C1.18295652,13.4041739 1.6463913,13.5900435 2.20234783,13.5900435 L2.20234783,13.5900435 Z M2.20234783,8.30473913 C2.75913043,8.30473913 3.22256522,8.11969565 3.61165217,7.7306087 C4.00156522,7.34069565 4.1866087,6.85908696 4.1866087,6.32130435 C4.1866087,5.76452174 4.00156522,5.30108696 3.61165217,4.912 C3.22256522,4.52291304 2.75913043,4.33704348 2.20234783,4.33704348 C1.6463913,4.33704348 1.18295652,4.52291304 0.793043478,4.912 C0.403956522,5.30108696 0.218913043,5.76452174 0.218913043,6.32130435 C0.218913043,6.85908696 0.403956522,7.34069565 0.793043478,7.7306087 C1.18295652,8.11969565 1.6463913,8.30473913 2.20234783,8.30473913 L2.20234783,8.30473913 Z M5.61408696,18.1326957 C5.68843478,18.1880435 5.76278261,18.2252174 5.85530435,18.2252174 L18.4266957,18.2252174 C18.5200435,18.2252174 18.5935652,18.1880435 18.667913,18.1326957 C18.7232609,18.0583478 18.7604348,17.984 18.7604348,17.8914783 L18.7604348,15.9072174 C18.7604348,15.8146957 18.7232609,15.7403478 18.667913,15.666 C18.5935652,15.6106522 18.5200435,15.5734783 18.4266957,15.5734783 L5.85530435,15.5734783 C5.76278261,15.5734783 5.68843478,15.6106522 5.61408696,15.666 C5.53973913,15.7403478 5.52156522,15.8146957 5.52156522,15.9072174 L5.52156522,17.8914783 C5.52156522,17.984 5.53973913,18.0583478 5.61408696,18.1326957 L5.61408696,18.1326957 Z M5.61408696,12.8292174 C5.68843478,12.8853913 5.76278261,12.9217391 5.85530435,12.9217391 L18.4266957,12.9217391 C18.5200435,12.9217391 18.5935652,12.8853913 18.667913,12.8292174 C18.7232609,12.7548696 18.7604348,12.6813478 18.7604348,12.588 L18.7604348,10.6045652 C18.7604348,10.5120435 18.7232609,10.4376957 18.667913,10.3633478 C18.5935652,10.308 18.5200435,10.2708261 18.4266957,10.2708261 L5.85530435,10.2708261 C5.76278261,10.2708261 5.68843478,10.308 5.61408696,10.3633478 C5.53973913,10.4376957 5.52156522,10.5120435 5.52156522,10.6045652 L5.52156522,12.588 C5.52156522,12.6813478 5.53973913,12.7548696 5.61408696,12.8292174 L5.61408696,12.8292174 Z M5.56517435,7.54473913 C5.6002174,7.60091304 5.63526046,7.63726087 5.67886959,7.63726087 L11.6042606,7.63726087 C11.6482591,7.63726087 11.6829128,7.60091304 11.7179559,7.54473913 C11.7440435,7.4703913 11.761565,7.39686957 11.761565,7.30352174 L11.761565,5.32008696 C11.761565,5.22756522 11.7440435,5.15321739 11.7179559,5.07886957 C11.6829128,5.02352174 11.6482591,4.98634783 11.6042606,4.98634783 L5.67886959,4.98634783 C5.63526046,4.98634783 5.6002174,5.02352174 5.56517435,5.07886957 C5.5301313,5.15321739 5.52156522,5.22756522 5.52156522,5.32008696 L5.52156522,7.30352174 C5.52156522,7.39686957 5.5301313,7.4703913 5.56517435,7.54473913 L5.56517435,7.54473913 Z" id="Fill-125"></path>
                  <path d="M18.0854492,0.583007812 L20.4648438,0.583007812 L20.4648438,8.5 L18.9233398,8.5 L18.9233398,3.14501953 C18.9233398,2.99104741 18.9251302,2.77531063 18.9287109,2.49780273 C18.9322917,2.22029484 18.934082,2.00634841 18.934082,1.85595703 L17.4355469,8.5 L15.8295898,8.5 L14.3417969,1.85595703 C14.3417969,2.00634841 14.3435872,2.22029484 14.347168,2.49780273 C14.3507487,2.77531063 14.3525391,2.99104741 14.3525391,3.14501953 L14.3525391,8.5 L12.8110352,8.5 L12.8110352,0.583007812 L15.2172852,0.583007812 L16.6567383,6.80810547 L18.0854492,0.583007812 Z" id="M"></path>
                </g>
              </svg>
              <span class="text">Manga List</span>
            </a>
                  </div>
        </div>`;
		headerMenu.classList.add('other');
		
		let headerInfo = headerMenu.querySelector('.header-info');

		for( btn of itemBtns ){
			btn.className = 'add';
			btn.firstChild.textContent = 'Add';
		}

		if( view === 'visitor:user' ){
			if( !listMenu ){
				let div = document.createElement('div');
				div.className = 'list-menu-float';
				div.innerHTML = listMenuInner;
				listMenu = div;
				document.body.insertBefore(listMenu, document.getElementById('list-container'));
			}
			listMenu.querySelector('.setting').remove();
			listMenu.querySelector('.export').remove();
			headerInfo.innerHTML = `4
				<a href="/sharedanime.php?u1=Example&u2=Example2" onclick="return false;">Shared Anime</a>,
				0% Affinity
				- <a href="/history/Example" onclick="return false;"><i class="fa-solid fa-clock-rotate-left"></i> History</a>`;
		}
		else if( view === 'visitor:guest' ){
			listMenu.remove();
			headerInfo.innerHTML = `<a href="/login.php" onclick="return false;">Log in</a> -
				<a href="/register.php" onclick="return false;">Create an Anime List</a>`;
		}
	}
	else {
		return false;
	}
}

let cover = document.getElementById('cover-image-container');
function toggleCover( set = undefined ){
	if( set === true ){
		cover.classList.remove('hide');
	}
	else if( set === false ){
		cover.classList.add('hide');
	}
	else {
		cover.classList.toggle('hide');
	}
}

let stats = document.getElementsByClassName('list-stats')[0];
function toggleStats(  ){
	stats.style.overflow = 'hidden';
	stats.style.marginTop = '0';
	stats.style.marginBottom = '0';
	stats.style.paddingTop = '0';
	stats.style.paddingBottom = '0';
	
	let visible = { height: '30px' },
		invisible = { height: '0px' },
		timing = {
			duration: 100,
			easing: 'cubic-bezier(.02, .01, .47, 1)'
		},
		display = stats.style.display;

	if( !display || display === 'none' ){
		stats.style.display = 'block';

		stats.animate([
			invisible,
			visible
		], timing);

		setTimeout(() => {
			stats.style = 'display: block;';
		}, 100);
	}
	else {
		stats.animate([
			visible,
			invisible
		], timing);

		setTimeout(() => {
			stats.style = 'display: none;';
		}, 100);
	}
}
document.getElementById('show-stats-button').addEventListener('click', () => {
	toggleStats();
});

// Search Box

let searchBox = document.getElementById('search-box'),
	searchInput = searchBox.getElementsByTagName('input')[0];

// Activate
document.getElementById('search-button').addEventListener('click', () => {
  searchBox.classList.add('open');
  searchInput.focus();
});

// Deactivate
searchBox.addEventListener('focusout', () => {
	searchBox.classList.remove('open');
});