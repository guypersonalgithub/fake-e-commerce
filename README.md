- I have split the homepage into two pages - instead of having products in the homepage itself, I've created a dedicated Products page.

- The homepage only has a carousel that redirects to the desired product's modal, assuming the user is logged in.

- Both the products, cart and purchases pages are only accessible while logged in (obviously ignoring that the authentication is client sided and thus very easy to bypass).

- If not logged in, a user that tries to access them is redirected to the login page, and once they do login, they'll automatically be redirected to what they wanted to access previously.

- The cart is managed through a zustand store and can have its products managed from both the products and cart pages.

- The cart's data is saved in the localStorage for easy "refetching" on refresh, and is bound to usernames.

- A cart that was "checkouted" is saved under purchases.

- There is a purchases page that displays previously ordered carts, bound to the current logged in username.

- The products page is filterable through the url. The categories and the modal state are synched with the URL. Ideally, instead of using react-router's hooks, a more optimized and less "render-heavy" approach would be better, but since it requires a more complex solution, I've decided to avoid doing so for this task.

- The products page is wrapped by a virtual list.

- Since the Fake Store API doesn't offer pagination and limits support, I've just added a simulated infinite scroll - once intersecting with the bottom of the list, the same products that were previously fetched, are being added once more to the state.

