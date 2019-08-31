
import * as PropTypes from "prop-types";
import * as React from "react";
import {StyleProp, ViewStyle} from "react-native";

export interface Route {
  component?: React.ComponentType<any>;
  id?: string;
  title?: string;
  passProps?: Object;

  //anything else
  [key: string]: any;

  //Commonly found properties
  backButtonTitle?: string;
  content?: string;
  message?: string;
  index?: number;
  onRightButtonPress?: () => void;
  rightButtonTitle?: string;
  wrapperStyle?: any;
}


export interface NavigatorIOSProps {
  /**
   * The default background color of the navigation bar.
   */
  barTintColor?: string;

  /**
   * NavigatorIOS uses "route" objects to identify child views, their props, and navigation bar configuration.
   * "push" and all the other navigation operations expect routes to be like this
   */
  initialRoute: Route;

  /**
   * The default wrapper style for components in the navigator.
   * A common use case is to set the backgroundColor for every page
   */
  itemWrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Boolean value that indicates whether the interactive pop gesture is
   * enabled. This is useful for enabling/disabling the back swipe navigation
   * gesture.
   *
   * If this prop is not provided, the default behavior is for the back swipe
   * gesture to be enabled when the navigation bar is shown and disabled when
   * the navigation bar is hidden. Once you've provided the
   * `interactivePopGestureEnabled` prop, you can never restore the default
   * behavior.
   */
  interactivePopGestureEnabled?: boolean;

  /**
   * A Boolean value that indicates whether the navigation bar is hidden
   */
  navigationBarHidden?: boolean;

  /**
   * A Boolean value that indicates whether to hide the 1px hairline shadow
   */
  shadowHidden?: boolean;

  /**
   * The color used for buttons in the navigation bar
   */
  tintColor?: string;

  /**
   * The text color of the navigation bar title
   */
  titleTextColor?: string;

  /**
   * A Boolean value that indicates whether the navigation bar is translucent
   */
  translucent?: boolean;

  /**
   * NOT IN THE DOC BUT IN THE EXAMPLES
   */
  style?: StyleProp<ViewStyle>;
}

/**
* A navigator is an object of navigation functions that a view can call.
* It is passed as a prop to any component rendered by NavigatorIOS.
*
* Navigator functions are also available on the NavigatorIOS component:
*
* @see https://facebook.github.io/react-native/docs/navigatorios.html#navigator
*/
export default class NavigatorIOS extends React.Component<NavigatorIOSProps> {
  /**
   * Navigate forward to a new route
   */
  push: (route: Route) => void;

  /**
   * Go back one page
   */
  pop: () => void;

  /**
   * Go back N pages at once. When N=1, behavior matches pop()
   */
  popN: (n: number) => void;

  /**
   * Replace the route for the current page and immediately load the view for the new route
   */
  replace: (route: Route) => void;

  /**
   * Replace the route/view for the previous page
   */
  replacePrevious: (route: Route) => void;

  /**
   * Replaces the previous route/view and transitions back to it
   */
  replacePreviousAndPop: (route: Route) => void;

  /**
   * Replaces the top item and popToTop
   */
  resetTo: (route: Route) => void;

  /**
   * Go back to the item for a particular route object
   */
  popToRoute(route: Route): void;

  /**
   * Go back to the top item
   */
  popToTop(): void;
}
