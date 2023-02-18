uniform vec2 u_resolution;
#define complex_squared(a) vec2(a.x*a.x - a.y*a.y, 2*a.x*a.y)
#define complex_sum(a, b) vec2(a.x+b.x, a.y+b.y)
#define complex_abs(a) float(sqrt(a.x*a.x+a.y*a.y))

vec2 sphIntersect(in vec3 ro, in vec3 rd, float ra) {
	float b = dot(ro, rd);
	float c = dot(ro, ro) - ra * ra;
	float h = b * b - c;
	if(h < 0.0) return vec2(-1.0);
	h = sqrt(h);
	return vec2(-b - h, -b + h);
}

vec3 castRay(vec3 ro, vec3 rd) {
	vec2 it = sphIntersect(ro, rd, 1.0);
	if(it.x < 0.0) return vec3(0.0);
	return vec3(1.0);
}

//vec2 complex_squared(vec2 a) {return vec2(a.x*a.x + a.y*a.y, 2*a.x*a.y)}
//vec2 complex_sum(vec2 a, vec2 b) {return vec2(a.x+b.x, a.y+b.y)};
//vec2 complex_abs(vec2 a) {return sqrt(a.x*a.x+a.y*a.y)}

vec3 isMandelbrot(vec2 uv) {
	vec2 z = vec2(0.0);
	vec2 C = uv*3.0;
	for(int i=0; i<500; i++) {
		z=complex_sum(complex_squared(z), C);
		if (complex_abs(z) > 2.0) {return vec3(0.0+1.0/i);}
	}
	return vec3(1.0);
}

void main() {
	vec2 uv = (gl_TexCoord[0].xy - 0.5) * u_resolution / u_resolution.y;
	//vec2 uv = gl_TexCoord[0].xy; 
	//vec3 rayOrigin = vec3(-5.0, 0.0, 0.0);
	//vec3 rayDirection = normalize(vec3(1.0, uv));
	//vec3 col = castRay(rayOrigin, rayDirection);
	vec3 col = isMandelbrot(uv);
	gl_FragColor = vec4(col, 1.0);
}
