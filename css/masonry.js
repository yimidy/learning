function waterFull(parent,child){
	var container = document.getElementsByClassName(parent)[0];
	var boxs = document.getElementsByClassName(child);
	var box_width = boxs[0].offsetWidth;
	var cols = Math.floor((document.documentElement.clientWidth||document.body.clientWidth)/box_width);
	console.log(cols);
	container.style.width = cols*(box_width+10)+"px";
	var heightArr = [];
	for(var i=0;i<cols;i++){
		var box_height = boxs[i].offsetHeight;
		heightArr.push(box_height+10);
	}
	for(var i=cols;i<boxs.length;i++){
		var minColumn = minHeight(heightArr);
		boxs[i].style.position = "absolute";
		boxs[i].style.top = heightArr[minColumn]+"px";
		boxs[i].style.left = (box_width+10)*minColumn+"px";
		heightArr[minColumn] += boxs[i].offsetHeight+10;
	}
}
function minHeight(arr){
	var min = 0;
	for(var i=1;i<arr.length;i++){
		if(arr[i]<arr[min]){
			min = i;
		}
	}
	return min;
}
waterFull("masonry","item")
