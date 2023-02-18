uniform vec2 u_resolution;
#define complex_squared(a) vec2(a.x*a.x - a.y*a.y, 2*a.x*a.y)
#define complex_sum(a, b) vec2(a.x+b.x, a.y+b.y)
#define complex_abs(a) float(sqrt(a.x*a.x+a.y*a.y))

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
	vec3 col = isMandelbrot(uv);
	gl_FragColor = vec4(col, 1.0);
}
