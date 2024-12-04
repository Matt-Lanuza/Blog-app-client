# Blog App API - Documentation

## Resources

- App Base Url
    - https://blog-post-server.onrender.com

- Admin User
    - email: "admin@blog.com"
    - password: "admin1234"

- Non-admin Users
    - email: "dummy@blog.com"
    - password: "dummy1234" <br><br>

    - email: "fizz@blog.com"
    - password: "fizz1234"


## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```
#### [GET] - "/users/details"

- No Request Body



      
### Blog Posts

#### [POST] - "/posts/createPost"

- Sample Request Body

    ```json

    {
        "title": "Sample Title",
        "content": "Sample Content",
    }

    ```

#### [GET] - "/posts/getAllPosts"

- No Request Body

#### [GET] - "/posts/getPost/:id"

- No Request Body

#### [GET] - "/posts/getMyPosts"

- No Request Body

#### [PUT] - "/posts/editPost/:id"

- Sample Request Body

    ```json

    {
        "title": "New Title",
        "content": "New Content",
    }

    ```

#### [DELETE] - "/posts/deletePost/:id"

- No Request Body

#### [DELETE] - "/posts/adminDeletePost/:id"

- No Request Body

#### [PATCH] - "/posts/addComment/:id"

- Sample Request Body

    ```json

    {
        "comment": "Awesome! Wow! Superb!",
    }

    ```
#### [GET] - "/posts/getComments/:id"

- No Request Body

#### [DELETE] - "/posts/adminDeleteComment/:id/:commentId"

- No Request Body