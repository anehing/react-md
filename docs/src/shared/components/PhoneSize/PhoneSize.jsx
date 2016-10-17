import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';

import './_phone-size.scss';
import StatusBar from './StatusBar';
import CloseButton from 'containers/PhoneSizeDemo/CloseButton';

export default class PhoneSize extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    contentStyle: PropTypes.object,
    contentComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    iconLeft: PropTypes.node,
    contentClassName: PropTypes.string,
    toolbar: PropTypes.bool,
    toolbarProminent: PropTypes.bool,
    toolbarProminentTitle: PropTypes.bool,
    toolbarActions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    mobile: PropTypes.bool,
    tablet: PropTypes.bool,
    mobileOnly: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Title',
    iconLeft: 'menu',
    contentComponent: 'section',
    toolbar: true,
  };

  render() {
    const {
      children,
      title,
      className,
      contentComponent: Content,
      contentStyle,
      contentClassName,
      toolbar,
      toolbarActions,
      toolbarProminent,
      toolbarProminentTitle,
      iconLeft,
      mobile,
      tablet,
      mobileOnly,
      ...props,
    } = this.props;

    if (mobileOnly && tablet) {
      return children;
    }

    const content = (
      <Content
        style={contentStyle}
        className={cn('phone-size-content', {
          'toolbar-offset': toolbar,
        }, contentClassName)}
      >
        {children}
      </Content>
    );

    let toolbarNode;
    if (toolbar) {
      toolbarNode = (
        <Toolbar
          title={title}
          colored
          prominent={toolbarProminent}
          prominentTitle={toolbarProminentTitle}
          nav={<CloseButton icon>{iconLeft}</CloseButton>}
          actions={toolbarActions}
          className="md-toolbar--fixed-phone"
          fixed
        />
      );
    }

    return (
      <Paper className={cn('phone-size-container', className)} {...props}>
        <StatusBar mobile={mobile} />
        {toolbarNode}
        {content}
      </Paper>
    );
  }
}
