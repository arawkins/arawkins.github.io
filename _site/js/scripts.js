window.onload = () => {
    let lightboxOptions = {
        overlayOpacity: 0.8,
    };
    let lightboxSpark = new SimpleLightbox('.gallery-spark a', lightboxOptions);
    let lightboxUofG = new SimpleLightbox('.gallery-uofg a', lightboxOptions);
    let lightboxNetfirms = new SimpleLightbox('.gallery-netfirms a', lightboxOptions);
    let lightboxBestBuy = new SimpleLightbox('.gallery-bestbuy a', lightboxOptions);
    let lightboxBCWeb = new SimpleLightbox('.gallery-bcweb a', lightboxOptions);

    // initialize 'view more' links. First, get all instances of the link
    let viewMoreLinks = document.querySelectorAll('.view-more');

    // now loop through them all and listen for clicks on all of them
    viewMoreLinks.forEach((node) => {
        node.addEventListener("click", (e) => {
            // on a click, we want to toggle the hidden class on the next adjacent DOM element
            node.nextElementSibling.classList.toggle('hidden');
        });
    });
}
