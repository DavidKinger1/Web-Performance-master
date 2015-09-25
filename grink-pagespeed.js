
/** 
2  * grunt-pagespeed-ngrok 
3  * http://www.jamescryer.com/grunt-pagespeed-ngrok 
4  * 
5  * Copyright (c) 2014 James Cryer 
6  * http://www.jamescryer.com 
7  */ 
8 'use strict' 
9 
 
10 var ngrok = require('ngrok'); 
11 
 
12 module.exports = function(grunt) { 
13 
 
14   // Load grunt tasks 
15   require('load-grunt-tasks')(grunt); 
16 
 
17   // Grunt configuration 
18   grunt.initConfig({ 
19     pagespeed: { 
20       options: { 
21         nokey: true, 
22         locale: "en_GB", 
23         threshold: 40 
24       }, 
25       local: { 
26         options: { 
27           strategy: "desktop" 
28         } 
29       }, 
30       mobile: { 
31         options: { 
32           strategy: "mobile" 
33         } 
34       } 
35     } 
36   }); 
37 
 
38   // Register customer task for ngrok 
39   grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() { 
40     var done = this.async(); 
41     var port = 9292; 
42 
 
43     ngrok.connect(port, function(err, url) { 
44       if (err !== null) { 
45         grunt.fail.fatal(err); 
46         return done(); 
47       } 
48       grunt.config.set('pagespeed.options.url', url); 
49       grunt.task.run('pagespeed'); 
50       done(); 
51     }); 
52   }); 
53 
 
54   // Register default tasks 
55   grunt.registerTask('default', ['psi-ngrok']); 
56 } 
 