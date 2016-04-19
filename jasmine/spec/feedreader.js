/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //Define first test suite 'RSS Feeds'
    describe('RSS Feeds', function() {
        //Check if allFeeds is defined & with length not to be 0
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //Similar to above, except we check if url is not empty with .toEqual('');
        it('has URLs', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toEqual('');
            }
        });
        //Similar to above, except we check if name is not empty 
        it('has names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual('');
            }
        });
    });
    //Define our second test suite 'The menu'
    describe('The menu', function() {
        //Here we just check if the class is there, which will hide the element
        it('is hidden', function() {
            expect($('.menu-hidden').is(':visible')).toBe(true);
        });

        it('slides when clicked', function() {
            //opens menu
            $(".menu-icon-link").click();
            expect($('.menu-hidden').is(':visible')).toBe(false);
            //closed menu, check if class is visible
            $(".menu-icon-link").click();
            expect($('.menu-hidden').is(':visible')).toBe(true);
        });
    });
    //Define our third test suite 'Initial Entries'
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done); //0 for the first entry
            //done();
        });
        //check if child of feed class is empty
        it('load at least once', function() {
            expect($('.feed').is(':empty')).toBe(false);
        });

    });
    //Define our fourth test suite 'New Feed Selection'
    describe('New Feed Selection', function() {
        //From loading the second feed, we save the dom html to a variable
        var htmlChange;
        beforeEach(function(done) {
            //load the next feed link
            loadFeed(1, function() {
                //taking the feed container for comparison
                htmlChange = $('.feed').html();
                done();
            });
        });

        it('changed after clicking different feed link', function(done) {
            //reload back to default
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(htmlChange);
                done();
            });
        });
    });
}());