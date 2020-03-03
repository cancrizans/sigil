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

function drawSigil(seed,ctx){
	ctx.save();
	ctx.rotate(-Math.PI / 4);

	var rng = new Math.seedrandom(seed);
	let isFlip = rng()<0.2;
	ctx.lineWidth = 0.5;
	ctx.lineCap = "round";

	for(let s of segments){
		if(rng()<0.5){

			strokeSegment(s,isFlip,ctx);
		}
	}

	ctx.restore();
}