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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it('should be defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
      });


      /* This test loops through each feed in the allFeeds object
       * and ensures it has a URL defined and that the URL is not empty.
       */
       allFeeds.forEach(function(key) {
         it('should have a feed URL that is defined and not empty', function() {
           expect(key.url).toBeDefined();
           expect(key.url.length).not.toEqual(0);
         });
       });

       /* This test loops through each feed in the allFeeds object
        * and ensures it has a name defined and that the name is not empty.
        */
       allFeeds.forEach(function(key) {
         it('should have a feed name that is defined and not empty', function() {
           expect(key.name).toBeDefined();
           expect(key.name.length).not.toEqual(0);
         });
       });
    });

    /* This test suite covers the menu */
    describe('The menu', function() {
      let body, menuIcon;

      beforeEach(function(){
          body = $('body');
          menuIcon = $('.menu-icon-link');
      });

      /* This test ensures the menu element is
       * hidden by default.
       */
       it('should be hidden by default', function() {
         if(typeof body != 'undefined') {
           expect(body.attr('class')).toEqual('menu-hidden');
         } else {
           throw 'body variable is undefined';
         }
       });

       /* This test ensures the menu changes visibility
        * when the menu icon is clicked. This test
        * has two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('should change visibility when menu icon is clicked', function() {
          if(typeof body != 'undefined' && typeof menuIcon != 'undefined') {
            // Trigger a click to display menu
            menuIcon.trigger( 'click' );
            expect(body.attr('class')).toEqual('');
            // Trigger a second click to hide menu
            menuIcon.trigger( 'click' );
            expect(body.hasClass('menu-hidden')).toBe(true);
          } else {
            throw 'body and/or menuIcon variable is undefined';
          }
        });
    });

    /* This test suite covers the loading of initial feed entries */
    describe('Initial Entries', function() {
      let feedContainer;
      let feedIndex = 0;

      beforeEach(function(done) {
        if(feedIndex >=0 && feedIndex < allFeeds.length) {
          loadFeed(feedIndex, function() {
            done();
          });
          feedContainer = $('.feed');
        } else {
          throw 'feedIndex value is out of bounds';
        }
      });

      /* This test ensures when the asynchronous loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      */
      it('should contain at least one feed entry', function(done) {
        if(typeof feedContainer != 'undefined') {
          expect(feedContainer.find('.entry').length > 0).toBe(true);
          done();
        } else {
          throw 'feedContainer is undefined';
        }
      });
    });

    /* This test suite covers new feeds */
    describe('New Feed Selection', function() {
      let initialEntryText, newEntryText;
      let initialFeedIndex = 0;
      let newFeedIndex = 2;

      beforeEach(function(done) {
        if(initialFeedIndex >=0 && initialFeedIndex < allFeeds.length) {
          // Load initial feed
          loadFeed(initialFeedIndex, function() {
            // Get initial entry
            initialEntryText = $('.feed').find('h2').first().text();
            if(newFeedIndex >=0 && newFeedIndex < allFeeds.length) {
              // Load a new feed
              loadFeed(newFeedIndex, function() {
                // Get new entry
                newEntryText = $('.feed').find('h2').first().text();
                done();
              });
            } else {
              throw 'newFeedIndex value is out of bounds';
            }
          });
          } else {
            throw 'initialFeedIndex value is out of bounds';
          }
        });

      /* This test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
       it('should have new content', function(done) {
         if(typeof initialEntryText != 'undefined' && typeof newEntryText != 'undefined'){
           expect(newEntryText).not.toEqual(initialEntryText);
           done();
         } else {
           throw 'initialEntryText and/or newEntryText variable is undefined';
         }
       })
    });
}());
