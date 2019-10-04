FLAGS=--compilation_level SIMPLE_OPTIMIZATIONS --charset utf-8

all: dqmsl.min.js dqmsl.user.js

dqmsl.min.js: dqmsl.js
	closure-compiler $(FLAGS) $< > $@

dqmsl.user.js: dqmsl.min.js firefox.header
	cat firefox.header | cat - $< > $@

script.js: dqmsl.js gen_safari_extension_script
	./gen_safari_extension_script

clean:
	rm -f *.bak
	[[ -f script.js ]] && rm script.js

.PHONY: clean all
