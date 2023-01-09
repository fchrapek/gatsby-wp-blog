import React from 'react';
import Layout from './src/components/Layout';
require("prismjs/themes/prism-tomorrow.css");

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
