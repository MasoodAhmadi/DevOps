// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',  // Development mode
//   entry: path.resolve(__dirname, 'src', 'index.js'),  // Entry point
//   output: {
//     filename: 'bundle.js',  // Output file
//     path: path.resolve(__dirname, 'dist'),  // Output directory
//     clean: true,  // Clean output directory before each build
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,  // Match both .js and .jsx files
//         exclude: /node_modules/,  // Exclude node_modules
//         use: {
//           loader: 'babel-loader',  // Use Babel for transpiling
//           options: {
//             presets: [
//               '@babel/preset-env',  // Transpile ES6+
//               '@babel/preset-react'  // Transpile JSX
//             ],
//           },
//         },
//       },
//       {
//         test: /\.css$/,  // Handle CSS files
//         use: ['style-loader', 'css-loader'],  // Loaders for CSS
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],  // Resolve these file extensions
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, 'public', 'index.html'),  // HTML template
//     }),
//   ],
//   devServer: {
//     static: path.join(__dirname, 'dist'),  // Serve content from dist directory
//     historyApiFallback: true,  // Support for React Router
//     port: 8080,  // Port for the development server
//   },
// };
