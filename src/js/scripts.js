window.onload = () => {
    var lightboxOptions = {
        overlayOpacity: 0.8,
    };
    var lightboxSpark = new SimpleLightbox('.gallery-spark a', lightboxOptions);
    var lightboxUofG = new SimpleLightbox('.gallery-uofg a', lightboxOptions);
    var lightboxNetfirms = new SimpleLightbox('.gallery-netfirms a', lightboxOptions);
    var lightboxBestBuy = new SimpleLightbox('.gallery-bestbuy a', lightboxOptions);
    var lightboxBCWeb = new SimpleLightbox('.gallery-bcweb a', lightboxOptions);
}
