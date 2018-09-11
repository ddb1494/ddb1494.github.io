{
	let counts = {};

	window.addEventListener('keydown',function(e){
		e=e.originalEvent;
		e.preventDefault();
		let command=[];
		if(e.ctrlKey)  command.push('ctrl');
		if(e.shiftKey) command.push('shift');
		if(e.altKey)   command.push('alt');
		command.push(e.code);
		let commandString=command.join('+');
		console.log(commandString);
	},true);

	function UI(){
		let ui=document.getElementById('keydownUI');
		if(!ui) {
			ui=document.createElement('div');
			document.body.prependChild(ui);
			ui.setAttribute('id',keydownUI);
			ui.style.border='2px solid #ccf';
			ui.style.background='#eef';
			ui.style.display='block';
		}
		return ui;
	}

	function key(k) {
		let ui = UI().getElementById(k);
		if(!ui){
			ui=document.createElement('div');
			UI().prependChild(ui);
			ui.setAttribute('id',k);
			ui.style.background='2px solid #ffe';
			ui.style.borderRadius='6px';
			ui.style.display='flex';
		}
		if(counts[k]===undefined) counts[k]=1;
		else counts[k]++;
		ui.textContent=`${k}(${counts[k]})`;
	}
}