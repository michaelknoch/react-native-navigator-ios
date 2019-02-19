/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTWrapperViewControllerWithNavItem.h"

#import <UIKit/UIScrollView.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>
#import <React/UIView+React.h>
#import <React/RCTAutoInsetsProtocol.h>

#import "RCTNavItem.h"

@implementation RCTWrapperViewControllerWithNavItem


- (instancetype)initWithNavItem:(RCTNavItem *)navItem
{
  if ((self = [super initWithContentView:navItem])) {
    _navItem = navItem;
  }
  return self;
}

static UIView *RCTFindNavBarShadowViewInView(UIView *view)
{
    if ([view isKindOfClass:[UIImageView class]] && view.bounds.size.height <= 1) {
        return view;
    }
    for (UIView *subview in view.subviews) {
        UIView *shadowView = RCTFindNavBarShadowViewInView(subview);
        if (shadowView) {
            return shadowView;
        }
    }
    return nil;
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];

    // TODO: find a way to make this less-tightly coupled to navigation controller
    if ([self.parentViewController isKindOfClass:[UINavigationController class]])
    {
        [self.navigationController
         setNavigationBarHidden:_navItem.navigationBarHidden
         animated:animated];

        UINavigationBar *bar = self.navigationController.navigationBar;
        bar.barTintColor = _navItem.barTintColor;
        bar.tintColor = _navItem.tintColor;
        bar.translucent = _navItem.translucent;
#if !TARGET_OS_TV
        bar.barStyle = _navItem.barStyle;
#endif
        bar.titleTextAttributes = _navItem.titleTextColor ? @{
                                                              NSForegroundColorAttributeName: _navItem.titleTextColor
                                                              } : nil;

        RCTFindNavBarShadowViewInView(bar).hidden = _navItem.shadowHidden;

        UINavigationItem *item = self.navigationItem;
        item.title = _navItem.title;
        item.titleView = _navItem.titleImageView;
#if !TARGET_OS_TV
        item.backBarButtonItem = _navItem.backButtonItem;
#endif //TARGET_OS_TV
        item.leftBarButtonItem = _navItem.leftButtonItem;
        item.rightBarButtonItem = _navItem.rightButtonItem;
    }
}

- (void)didMoveToParentViewController:(UIViewController *)parent
{
    // There's no clear setter for navigation controllers, but did move to parent
    // view controller provides the desired effect. This is called after a pop
    // finishes, be it a swipe to go back or a standard tap on the back button
    [super didMoveToParentViewController:parent];
    if (parent == nil || [parent isKindOfClass:[UINavigationController class]]) {
        [self.navigationListener wrapperViewController:self
                         didMoveToNavigationController:(UINavigationController *)parent];
    }
}

@end

