function sanitize(raw){
	let text = raw.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\? ]/g,"").trim().toUpperCase();

	if(text == "")
		text = "-";

	return text;
}

function getSeed(sanitized){
	return "&"+sanitized;
}

var N = 2;
var segments = [];
for(let m = -N; m<=N; m++){
	for(let n=-N; n<-m; n++){
		segments.push([m,n,m+1,n]);
		segments.push([m,n,m,n+1]);
	}
}

function strokeSegment(s,spin,ctx){
	ctx.beginPath();
	ctx.moveTo(s[0],s[1]);
	ctx.lineTo(s[2],s[3]);
	ctx.stroke();
	ctx.beginPath();
	if(spin){
		ctx.moveTo(-s[0],-s[1]);
		ctx.lineTo(-s[2],-s[3]);
	}
	else{
		ctx.moveTo(-s[1],-s[0]);
		ctx.lineTo(-s[3],-s[2]);
	}

	ctx.stroke();
}

function generateSigilData(seed){
	var rng = new Math.seedrandom(seed);
	let flip = rng()<0.2;
	let segs = [];
	for(let s of segments)
		segs.push(rng()<0.5)

	return { 'flip':flip,'segs':segs};
}

function drawSigilFromData(data,ctx,isRound){
	ctx.save();
	ctx.rotate(-Math.PI / 4);

	
	let isFlip = data.flip;
	ctx.lineWidth = 0.5;
	ctx.lineCap = isRound?"round":"square";

	segments.forEach(function(s,i){
		if(data.segs[i]){

			strokeSegment(s,isFlip,ctx);
		}
	});

	ctx.restore();
}

function drawSigil(seed,ctx,isRound){
	let data = generateSigilData(seed);
	drawSigilFromData(data,ctx,isRound);
}