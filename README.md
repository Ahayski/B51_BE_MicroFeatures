# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# How To Use Pemilu Backend Using Postman

How to use authorization
1. Click tab authorization on postman
2. Choose Type "Bearer Token" on the left
3. Insert token on the right


#### A. User

1. Register Auth<br>
* Url : http://localhost:5000/api/v1/auth/register
* Method : `POST`
* Json body example :

        {
            "fullName" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "gender" : "Laki-Laki",
            "userName" : "Eslamet",
            "password" : "akusukapisang"
        }

2. Login<br>
* Url       : http://localhost:5000/api/v1/auth/login
* Method    : `POST`
* Json body example :

        {
            "userName" : "Eslamet",
            "password" : "akusukapisang"
        }

note: you will received token which is used to authorization<br>


#### B. Article

1. Getting all articles (no authorization)<br>
* Url       : http://localhost:5000/api/v1/articles
* Method    : `GET`
  
2. Getting a article (no authorization)<br>
* Url       : http://localhost:5000/api/v1/article/{article-id}
* Method    : `GET`

3. Create a article (required authorizaton)
* Url       : http://localhost:5000/api/v1/article
* Method    : `POST`
* Form-data body example :
```
    gambar       = miku.png 
    articleDate = 2024-01-01
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
```

4. Update a article (required authorizaton)<br>  
* Url       : http://localhost:5000/api/v1/article/{article-id}
* Method    : `PUT`
* Form-data body example :
```
    gambar       = miku.png 
    articleDate = 2024-01-01
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
```

5. Delete a article (required authorization)<br>
* Url       : http://localhost:5000/api/v1/article/{article-id}
* Method    : `DELETE`


#### C. Voter

1. Getting all vote (required authorization)<br>
* Url       : http://localhost:5000/api/v1/voters
* Method    : `GET`

2. Voting (required authorization)<br>
* Url       : http://localhost:5000/api/v1/voter<br>
* Method    : `POST`
* Json body example :

        {
            "paslon" : 1
        }


#### D. Paslon

1. Getting all paslon (no authorization)<br>
* Url       : http://localhost:5000/api/v1/paslons
* Method    : `GET`
  
2. Getting a paslon (no authorization)<br>
* Url       : http://localhost:5000/api/v1/paslon/{paslon-id}
* Method    : `GET`

3. Create a paslon (required authorizaton)
* Url       : http://localhost:5000/api/v1/paslon
* Method    : `POST`
* Form-data body example :
````
    nama          = Slamet Wilujeng
    paslonImg     = slamet.png
    noUrut        = 1
    visiMisi      = Menghilangkan pinjol dari dumbways
    
````
4. Update a paslon (required authorizaton)
* Url       : http://localhost:5000/api/v1/paslon/{paslon-id}
* Method    : `PUT`
* Form-data body example :
```
    nama          = Slamet Wilujeng
    paslonImg     = slamet.png
    noUrut        = 1
    visiMisi      = Menghilangkan pinjol dari dumbways
```
5. Delete a paslon (required authorization)<br>
* Url       : http://localhost:5000/api/v1/paslon/{paslon-id}
* Method    : `DELETE`

#### E. Partai

1. Getting all partais (no authorization)<br>
* Url       : http://localhost:5000/api/v1/partais
* Method    : `GET`
  
2. Getting a partai (no authorization)<br>
* Url       : http://localhost:5000/api/v1/partai/{partai-id}
* Method    : `GET`

3. Create a partai (required authorizaton)
* Url       : http://localhost:5000/api/v1/partai
* Method    : `POST`
* Form-data body example :
```
    nourutPaslon = 1
    partaiImg    = slamet.png
    nama         = PBG
    ketuaUmum    = Slamet Wilujeng
    visiMissi    = Menghijaukan bumi,mengumpulkan dragonball
    alamat       = Hutan Jaya
   
```
4. Update a partai (required authorizaton)
* Url       : http://localhost:5000/api/v1/partai/{{paslon-id}}
* Method    : `PUT`
* Form-data body example :
```
    nourutPaslon = 1
    partaiImg    = slamet.png
    nama         = PBG
    ketuaUmum    = Slamet Wilujeng
    visiMissi    = Menghijaukan bumi,mengumpulkan dragonball
    alamat       = Hutan Jaya
```
5. Delete a partai (required authorization)<br>
* Url       : http://localhost:5000/api/v1/partai/{{paslon-id}}
* Method    : `DELETE`


