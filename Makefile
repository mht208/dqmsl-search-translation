FLAGS=--compilation_level SIMPLE_OPTIMIZATIONS --charset utf-8

dqmsl.min.js: dqmsl.js
	closure-compiler $(FLAGS) $< > $@

clean:
	rm dqmsl.min.js

.PHONY: clean
