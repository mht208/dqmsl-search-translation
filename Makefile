FLAGS=--compilation_level SIMPLE_OPTIMIZATIONS --charset utf-8

all: dqmsl.min.js dqmsl.user.js

dqmsl.min.js: dqmsl.js
	closure-compiler $(FLAGS) $< > $@

dqmsl.user.js: dqmsl.min.js
	cat firefox.header | cat - $< > $@

clean:
	rm dqmsl.min.js

.PHONY: clean all
