/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <React/RCTWrapperViewController.h>

@class RCTNavItem;
@class RCTWrapperViewControllerWithNavItem;


@protocol RCTWrapperViewControllerNavigationListener <NSObject>

- (void)wrapperViewController:(RCTWrapperViewControllerWithNavItem *)wrapperViewController
didMoveToNavigationController:(UINavigationController *)navigationController;

@end

@interface RCTWrapperViewControllerWithNavItem : RCTWrapperViewController

- (instancetype)initWithNavItem:(RCTNavItem *)navItem;

@property (nonatomic, weak) id<RCTWrapperViewControllerNavigationListener> navigationListener;
@property (nonatomic, strong) RCTNavItem *navItem;

@end
