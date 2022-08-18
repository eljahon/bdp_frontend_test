str = decodeURIComponent(escape(Buffer.from(str, 'base64').toString('binary')))

str = JSON.parse(str)
return str
