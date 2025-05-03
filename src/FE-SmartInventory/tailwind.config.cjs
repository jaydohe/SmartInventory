/** @type {import('tailwindcss').Config} */
/**chỉnh màu sắc trong trang html*/
module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      bgHeaderItem: '#434346',
      notifyColorHover: '#eda1aa',
      primary: '#00b0ec',
      primaryColorHover: '#30bfff',
      secondary: '#f13d40',

      colorBgLayout: '#f3f4f6',
      colorBgItem: '#fafafa',
      colorBgContainer: '#ffffff',
      textWhite: '#ffffff',

      colorLink: '#00b0ec',
      colorLinkHover: '#174cda',

      successColor: '#52c41a',
      successColorHover: '#73d13d',
      successColor1: '#00b96b',
      successColorHover1: '#00a45f',
      infoColor: '#1677ff',
      infoColorHover: '#50b5ff',
      warningColor: '#faad14',
      warningColorHover: '#ffc53d',
      errorColor: '#e71f45',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
