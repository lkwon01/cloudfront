function handler(event) {
    var request = event.request;
    var headers = request.headers;

    var isMobile = headers['cloudfront-is-mobile-viewer'] && headers['cloudfront-is-mobile-viewer'].value === 'true';
    var isDesktop = headers['cloudfront-is-desktop-viewer'] && headers['cloudfront-is-desktop-viewer'].value === 'true';

    var redirectUrls = {
      'isMobile': 'http://lexarsm.s3-website-us-east-1.amazonaws.com/mobile',  // Example mobile URL
      'isDesktop': 'http://lexarsm.s3-website-us-east-1.amazonaws.com/desktop', // Example desktop URL
      'Default': 'http://lexarsm.s3-website-us-east-1.amazonaws.com'           // Default URL
    };

    var redirectUrl;
    var statusDescription;

    if (isMobile) {
      redirectUrl = redirectUrls.isMobile;
      statusDescription = 'Mobile device detected';
    } else if (isDesktop) {
      redirectUrl = redirectUrls.isDesktop;
      statusDescription = 'Desktop device detected';
    } else {
      redirectUrl = redirectUrls.Default;
      statusDescription = 'Device type not detected, using default';
    }

    var response = {
      statusCode: 302,
      statusDescription: statusDescription,
      headers: {
        location: { value: redirectUrl }
      }
    };

    return response;
}

