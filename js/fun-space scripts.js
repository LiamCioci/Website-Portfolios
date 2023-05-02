$('.section-works__item').click(event=>{
    if($(event.currentTarget).hasClass('active')){
      
    $('.section-works__item.active').removeClass('active');  
    } else {
    $('.section-works__item.active').removeClass('active');
      $(event.currentTarget).addClass('active');
    }
  })