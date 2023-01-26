const xmlParser = require('xml-parser');

const Handlebars = require('handlebars');

const request = require('request');
const fs = require('fs');
// const async = require('async');
const BitlyClient = require('bitly').BitlyClient;

const csv = require('fast-csv');



//question 1
const XmlParser = {
    parseXml: function(options, callback) {
    fs.readFile(options.filePath, 'utf8', (err, xmlString) => {
    if (err) {
    callback(err);
    return;
    }
    callback(null, xmlParser(xmlString));
    });
    }
    };
    
    const options = {
    filePath: "example.xml"
    };
    
    XmlParser.parseXml(options, (err, result) => {
    if (err) {
    console.log(`Error: ${err.message}`);
    return;
    }
    console.log(result);
    });

// question 2


const feedData = {
  title: "My Feed",
  items: [
    {
      title: "Item 1",
      link: "http://www.example.com/item1",
      description: "This is the first item in my feed."
    },
    {
      title: "Item 2",
      link: "http://www.example.com/item2",
      description: "This is the second item in my feed."
    }
  ]
};

const xmlTemplate = `
  <rss version="2.0">
    <channel>
      <title>{{title}}</title>
      {{#each items}}
        <item>
          <title>{{title}}</title>
          <link>{{link}}</link>
          <description>{{description}}</description>
        </item>
      {{/each}}
    </channel>
  </rss>
`;

const template = Handlebars.compile(xmlTemplate);
const xmlFeed = template(feedData);
console.log(xmlFeed);




// question 3
const request = require('request');
const fs = require('fs');

request('https://www.google.com', (error, response, body) => {
if (error) {
console.error(`Error: ${error.message}`);
return;
}
if (response.statusCode === 200) {
fs.writeFile('google.html', body, (err) => {
if (err) {
console.error(`Error: ${err.message}`);
return;
}
console.log('File saved successfully!');
});
}
});

const file = fs.createWriteStream('file.jpg');
const url = 'https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg';

request.get(url)
.on('response', (response) => {
console.log(`Downloading ${url}`);
})
.on('error', (error) => {
console.error(`Error: ${error.message}`);
})
.pipe(file)
.on('finish', () => {
console.log('File downloaded successfully!');
});


 // question 4

const images = [
    'http://sousmonarbre.com/qphj/bd963843d2239ed78aa6f7b0a36b537d/qdp/shapely-table-mat-design-office-bay-decoration-mes-at-work-decorating-ideas-office-decoration-mes-design-ideas-cream-wall-paint-decoration-messroom-wooden-laminate-ing-tosca-color__office-decorating-ideas.jpg',
    'https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
"https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg",
"https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg",
"http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg",
"https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg",
"https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg",
"https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg",
"https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg"

];

let folderCounter = 1;
let imageCounter = 0;

async.each(images, (image, callback) => {
    if (imageCounter >= 5) {
        folderCounter++;
        imageCounter = 0;
    }

    request(image)
        .pipe(fs.createWriteStream(`./folder${folderCounter}/image${imageCounter}.jpg`))
        .on('finish', () => {
            console.log(`Image ${imageCounter} downloaded`);
            imagemin([`./folder${folderCounter}/image${imageCounter}.jpg`], `./folder${folderCounter}`, {
                use: [imageminJpegtran()]
            }).then(() => {
                console.log(`Image ${imageCounter} compressed and saved`);
                imageCounter++;
                callback();
            });
        });
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('All images downloaded, compressed and saved');
    }
});





// question number 5
class UrlShortener {
    constructor(urls) {
        this.urls = urls;
       
        this.bitly = new BitlyClient('d9f8c523d2f601444ff7fca2769e73303d9c10fc');
    }

    async shortenUrls() {
        const data = [];
        for (const url of this.urls) {
            const shortenedUrl = await this.bitly.shorten(url);
            data.push({original: url, shortened: shortenedUrl});
        }

        csv.writeToPath('./shortenedUrls.csv', data, {headers: true})
            .on('finish', () => {
                console.log('CSV file saved!');
            });
    }
}

const urls = [
    'http://sousmonarbre.com/qphj/bd963843d2239ed78aa6f7b0a36b537d/qdp/shapely-table-mat-design-office-bay-decoration-mes-at-work-decorating-ideas-office-decoration-mes-design-ideas-cream-wall-paint-decoration-messroom-wooden-laminate-ing-tosca-color__office-decorating-ideas.jpg',
    'https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg'
];

const shortener = new UrlShortener(urls);
shortener.shortenUrls();

