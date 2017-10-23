/**
 * Created by Sajid on 30/03/2017.
 */
(function($){
    /*Subscriber form js Start*/

    var formComp = 'form-comp-1';
    var formCompMessage = '__content';

    if( $('#subscriber_form').parents('section.form-comp-2').length ) {
        formComp = 'form-comp-2';
        formCompMessage = '__heading';
    } else if ( $('#subscriber_form').parents('section.form-comp-3').length ) {
        formComp = 'form-comp-3';
        formCompMessage = '__heading';
    }

   // $("#phone").mask("(999) 999-9999");
    $('#subscriber_form').validate({
        errorClass: formComp + "__errors",
        rules: {
            fullName:	"required",
            email:	{
                required: true,
                email: true
            },
        },
        messages: {
            fullname: "Please enter your full name",
            email: "Please enter a valid email address"
        },
        submitHandler: function () {
            $.ajax({
                type: "POST",
                url: "/subscriber-email",
                data: $('#subscriber_form').serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#subscriber-submit span").html("Please wait ...");
                    $("#subscriber_form .message").remove();
                },
                success: function (data) {
                    if (data.success) {
                        $("#subscriber-submit span").html('Learn More');
                        $("#subscriber_form input").val('');
                        //$("#subscriber_form").before('<div class="'+ formComp + formCompMessage +' message">Thank you for reaching out. We will get in touch soon.</div>');
                    } else {
                        $("#subscriber-submit span").html('Learn More');
                        $("#subscriber_form .row").before('<div class="'+ formComp +  formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                    }
                },
                error: function () {
                    $("#subscriber-submit span").html('Submit');
                    $("#subscriber-submit .row").before('<div class="'+ formComp + formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                }
            });
        }
    });
    /*Subscriber form js End*/

/*Contact form js start*/

    formComp = 'form-comp-1';
    formCompMessage = '__content';

    if( $('#contact-email').parents('section.form-comp-2').length ) {
        formComp = 'form-comp-2';
        formCompMessage = '__heading';
    } else if ( $('#contact-email').parents('section.form-comp-3').length ) {
        formComp = 'form-comp-3';
        formCompMessage = '__heading';
    }

    //$("#phone").mask("(999) 999-9999");
    $('#contact-email').validate({
        errorClass: formComp + "__errors",
        rules: {
            firstName:	"required",
            lastName:	"required",
            phone:	    "required",
            message:	"required",
            email:	{
                required: true,
                email: true
            },
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            phone: "Please enter your phone number",
            email: "Please enter a valid email address",
            message: "Please enter a meassage",
        },
        submitHandler: function () {
            $.ajax({
                type: "POST",
                url: "/contact-email",
                data: $('#contact-email').serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#contact-email-submit span").html("Please wait ...");
                    $("#contact-email .message").remove();
                },
                success: function (data) {
                    if (data.success==1) {
                        window.location = "/thank-you";
                    } else {
                        if(data.success==2){
                            $("#contact-email-submit span").html('Submit');
                            $('.g-recaptcha').after('<div style="color:#ff0000;" class="error">Wrong Captcha</div>');
                        }else {
                            $("#contact-email-submit span").html('Submit');
                            $("#contact-email .row").before('<div class="' + formComp + formCompMessage + '__content message">Something went wrong. Please try again later.</div>');
                        }
                    }
                },
                error: function () {
                    $("#contact-email-submit span").html('Submit');
                    $("#contact-email .row").before('<div class="'+ formComp + formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                }
            });
        }
    });

    /*Contact form js End*/


    /*Book Now form js start*/

    formComp = 'form-comp-1';
    formCompMessage = '__content';

    if( $('#book-now-email').parents('section.form-comp-2').length ) {
        formComp = 'form-comp-2';
        formCompMessage = '__heading';
    } else if ( $('#book-now-email').parents('section.form-comp-3').length ) {
        formComp = 'form-comp-3';
        formCompMessage = '__heading';
    }

    //$("#phone").mask("(999) 999-9999");
    $('#book-now-email').validate({
        errorClass: formComp + "__errors",
        rules: {
            firstName:	"required",
            lastName:	"required",
            phone:	    "required",
            eventDate:	    "required",
            eventLocation:	"required",
            topic:	    "required",
            email:	{
                required: true,
                email: true
            },
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            phone: "Please enter your phone number",
            email: "Please enter a valid email address",
            eventDate: "Please select a event date",
            eventLocation: "Please enter a location",
            topic: "Please select a topic",
        },
        submitHandler: function () {
            $.ajax({
                type: "POST",
                url: "/book-now-email",
                data: $('#book-now-email').serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#book-now-email-submit span").html("Please wait ...");
                    $("#book-now-email .message").remove();
                },
                success: function (data) {
                    if (data.success==1) {
                        window.location = "/thank-you";
                    } else {
                        if(data.success==2){
                            $("#book-now-email-submit span").html('Submit');
                            $('.g-recaptcha').after('<div style="color:#ff0000;" class="error">Wrong Captcha</div>');
                        }else {
                            $("#book-now-email-submit span").html('Submit');
                            $("#book-now-email .row").before('<div class="' + formComp + formCompMessage + '__content message">Something went wrong. Please try again later.</div>');
                        }
                    }
                },
                error: function () {
                    $("#book-now-email-submit span").html('Submit');
                    $("#book-now-email .row").before('<div class="'+ formComp + formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                }
            });
        }
    });

    /*Book Now form js End*/


    /*Join Us Now form js start*/

    formComp = 'form-comp-1';
    formCompMessage = '__content';

    if( $('#join-us-email').parents('section.form-comp-2').length ) {
        formComp = 'form-comp-2';
        formCompMessage = '__heading';
    } else if ( $('#join-us-email').parents('section.form-comp-3').length ) {
        formComp = 'form-comp-3';
        formCompMessage = '__heading';
    }

    //$("#phone").mask("(999) 999-9999");
    $('#join-us-email').validate({
        errorClass: formComp + "__errors",
        rules: {
            firstName:	"required",
            lastName:	"required",
            phone:	    "required",
            message:	"required",
            resume:	    "required",
            email:	{
                required: true,
                email: true
            },
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            phone: "Please enter your phone number",
            email: "Please enter a valid email address",
            message: "Please enter your  message",
            resume: "Please upload a resume"
        },
        submitHandler: function (submitform) {
            var form = new FormData($('#join-us-email')[0]);
            $.ajax({
                type: "POST",
                url: "/join-us-email",
                data: form,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $("#join-us-email-submit span").html("Please wait ...");
                    $("#join-us-email .message").remove();
                },
                success: function (data) {
                    if (data.success==1) {
                        window.location = "/thank-you";
                    } else {
                        if(data.success==2){
                            $("#join-us-email-submit span").html('Submit');
                            $('.g-recaptcha').after('<div style="color:#ff0000;" class="error">Wrong Captcha</div>');
                        }else {
                            $("#join-us-email-submit span").html('Submit');
                            $("#join-us-email .row").before('<div class="' + formComp + formCompMessage + '__content message">Something went wrong. Please try again later.</div>');
                        }
                    }
                },
                error: function () {
                    $("#join-us-email-submit span").html('Submit');
                    $("#join-us-email .row").before('<div class="'+ formComp + formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                }
            });
        }
    });

    /*Join Us Now form js End*/

    /*Sign Up Now form js start*/

    formComp = 'form-comp-1';
    formCompMessage = '__content';

    if( $('#signup_form').parents('section.form-comp-2').length ) {
        formComp = 'form-comp-2';
        formCompMessage = '__heading';
    } else if ( $('#signup_form').parents('section.form-comp-3').length ) {
        formComp = 'form-comp-3';
        formCompMessage = '__heading';
    }

    // $("#phone").mask("(999) 999-9999");
    $('#signup_form').validate({
        errorClass: formComp + "__errors",
        rules: {
            fullName:	"required",
            email:	{
                required: true,
                email: true
            },
        },
        messages: {
            fullname: "Please enter your full name",
            email: "Please enter a valid email address"
        },
        submitHandler: function () {
            $.ajax({
                type: "POST",
                url: "/signup-email",
                data: $('#signup_form').serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#signup-submit span").html("Please wait ...");
                    $("#signup_form .message").remove();
                },
                success: function (data) {
                    if (data.success) {
                        $("#signup-submit span").html('Sign Up');
                        $("#signup_form input").val('');
                        //$("#subscriber_form").before('<div class="'+ formComp + formCompMessage +' message">Thank you for reaching out. We will get in touch soon.</div>');
                    } else {
                        $("#signup-submit span").html('Learn More');
                        $("#signup_form .row").before('<div class="'+ formComp +  formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                    }
                },
                error: function () {
                    $("#signup-submit span").html('Submit');
                    $("#signup-submit .row").before('<div class="'+ formComp + formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                }
            });
        }
    });

    /*SignUp Now form js End*/

    /*Pop NewsLetter form js start*/

    formComp = 'form-comp-1';
    formCompMessage = '__content';

    if( $('#newsletter_form').parents('section.form-comp-2').length ) {
        formComp = 'form-comp-2';
        formCompMessage = '__heading';
    } else if ( $('#newsletter_form').parents('section.form-comp-3').length ) {
        formComp = 'form-comp-3';
        formCompMessage = '__heading';
    }

    // $("#phone").mask("(999) 999-9999");
    $('#newsletter_form').validate({
        errorClass: formComp + "__errors",
        rules: {
            fullName:	"required",
            email:	{
                required: true,
                email: true
            },
        },
        messages: {
            fullname: "Please enter your full name",
            email: "Please enter a valid email address"
        },
        submitHandler: function () {
            $.ajax({
                type: "POST",
                url: "/signup-email",
                data: $('#newsletter_form').serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#newsletter-submit span").html("Please wait ...");
                    $("#newsletter_form .message").remove();
                },
                success: function (data) {
                    if (data.success) {
                        $("#newsletter-submit span").html('Sign Up');
                        $("#newsletter_form input").val('');
                        $(".popup").hide();
                        //$("#subscriber_form").before('<div class="'+ formComp + formCompMessage +' message">Thank you for reaching out. We will get in touch soon.</div>');
                    } else {
                            $("#newsletter-submit span").html('Learn More');
                            $("#newsletter_form.row").before('<div class="' + formComp + formCompMessage + '__content message">Something went wrong. Please try again later.</div>');
                    }
                },
                error: function () {
                    $("#newsletter-submit span").html('Submit');
                    $("#newsletter-submit .row").before('<div class="'+ formComp + formCompMessage +'__content message">Something went wrong. Please try again later.</div>');
                }
            });
        }
    });

    /*Pop NewsLetter form js End*/


})(jQuery);