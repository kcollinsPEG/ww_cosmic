(function($) {
  $(".load-more-blogs").on("click", function() {
    $.ajax({
      type: "POST",
      url: "/blogs/load-more",
      data: {skip: $('.blog__articles-list .blog__articles-item').length},
      dataType: "json",
      beforeSend: function () {
        $(".load-more-blogs a span").html("Please wait...");
      },
      success: function (data) {
        if (data["load-more"])
          $(".load-more-blogs").show();
        else
          $(".load-more-blogs").hide();

        if (data.success) {
          $.each(data.object, function(index, blog) {
            var template = $(".blog__articles-list .blog__articles-item:first").clone();
            $(".card-01__date-day", template).html(blog.formatedDate.dayNum);
            $(".card-01__date-month", template).html(blog.formatedDate.halfMonth);
            $(".card-01__image-wrapper", template).attr("href", 'blogs/'+blog.slug);
            $(".card-01__image", template).html("src", blog.metadata.blog_image.url);
            $(".card-01__content", template).html(blog.title);
            $(".card-01__button", template).attr("href", 'blogs/'+blog.slug);
            $(".blog__articles-list").append(template);
          });
        }
      },
      error: function () {

      },
      complete: function () {
        $(".load-more-blogs a span").html("LOAD MORE");
      }
    });
  });
})(jQuery);
