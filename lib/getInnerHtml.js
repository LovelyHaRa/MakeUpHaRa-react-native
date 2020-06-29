import palette from './styles/open-color';

const getInnerHtml = ({ body, colorScheme }) => {
  const style = {
    backgroundColor: colorScheme === 'dark' ? palette.gray[9] : palette.gray[0],
    color: colorScheme === 'dark' ? palette.gray[0] : palette.gray[9],
  };
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          background-color: ${style.backgroundColor};
          color: ${style.color};
        }
      </style>
    </head>
    <body>
      ${body}
    </body>
    </html>
    `;
};

export default getInnerHtml;
