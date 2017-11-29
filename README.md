# text-metrics

This project was built with Turbo 360. To learn more, click here: https://www.turbo360.co

## Instructions
After cloning into repo, cd to project root directory and run npm install:

```
$ npm install
```

To run dev server, install Turbo CLI globally:

```
$ sudo npm install turbo-cli -g
```

Then run devserver from project root directory:

```
$ turbo devserver
```

To build for production, run build:

```
$ npm run build
```

## Documentation
Text Metrics takes a block of text and returns various information about it including word frequencies, sentiment, and processed versions of the text. The base endpoint is:

```
https://production.turbo360-vector.com/text-metrics-nlugpj/metrics
```

| Query        | Required           | Options  |
| ------------- | ------------- | ----- |
| text      | yes  | any string
| lang      | no | More information below

### Example 1 - GET Request

You should access this vector with a GET request if you only have a small amount of text to process (< 2000 characters), and you want to use your browser to see the results.

#### Step 1 (Optional)
Enter the language into the following endpoint as the 'lang' query parameter:

```
https://production.turbo360-vector.com/text-metrics-nlugpj/metrics?lang=en&text=Hello, how are you doing today?
```

The language parameter is used for proper removal of stopwords. If this parameter is omitted, it will default to English. The available languages are:

| lang 	| Language 					|
|----	|------------------------	|
| ar 	| Modern Standard Arabic   |
| bn 	| Bengali                	|
| br 	| Brazilian Portuguese   	|
| da 	| Danish                 	|
| de 	| German                 	|
| en 	| English                	|
| es 	| Spanish                	|
| fa 	| Farsi                  	|
| fr 	| French                 	|
| hi 	| Hindi                  	|
| it 	| Italian                	|
| ja 	| Japanese               	|
| nl 	| Dutch                  	|
| no 	| Norwegian              	|
| pl 	| Polish                 	|
| pt 	| Portuguese             	|
| ru 	| Russian                	|
| sv 	| Swedish                	|
| zh 	| Chinese Simplified     	|

#### Step 2

Find text that you would like to be processed, or use a simple example such as "Hello, how are you doing today?"

Enter the text into the following endpoint as the 'text' query parameter:

```
https://production.turbo360-vector.com/text-metrics-nlugpj/metrics?lang=en&text=Hello, how are you doing today?
```

#### JSON Payload

The JSON payload will contain the following information:

| Metrics           |                                                                                      |
|-------------------|--------------------------------------------------------------------------------------|
| numWords          | The total number of words in the original text                                       |
| numLetters        | The total number of letter in the original text                                      |
| averageWordLength | The average length of all words in the original text                                 |
| numUniqueWords    | The number of unique words in the original text                                      |
| wordOccurences    | A dictionary of all words in the text (except stopwords) and each word's frequency   |
| topTenWords       | A dictionary of the top 10 most frequent words in the text and each word's frequency |

| Sentiment   |                                                    |
|-------------|-----------------------------------------------------------------------------------------|
| score       | The AFINN-based sentiment score for the given text |
| comparative | The AFINN-based comparative for the given text     |
| positive    | A list of the positive words in the text           |
| negative    | A list of the negative words in the text           |

| Text              |                                                                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------|
| textOriginal      | The original text supplied as a query parameter                                                                                    |
| textSimplified    | The text after converting to lowercase, removing all non-alphanumeric characters, and converting all white spaces to simple spaces |
| textSansStopwords | The text after being simplified and having all stopwords removed                                                                   |

| Array               |                                                                       |
|---------------------|-----------------------------------------------------------------------|
| all                 | All the words in the original text in array form with repetitions     |
| unique              | All unique words in the original text in array form                   |
| uniqueSansStopwords | All unique words in the original text without stopwords in array form |


### Recommended Use
Use this vector to automatically process and analyze comments, reviews, blog posts, etc. as they come in on your website.
