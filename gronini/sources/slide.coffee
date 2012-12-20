
init = ->
  data = []
  container = document.getElementById('container')
  for i in [0...10]
    data.push { content:'<h1 contenteditable="true"> N°'+(i)+' title', id:i  }
  slider = new Diaporama data,container

class Diaporama
  constructor: (@data, container) ->
    @totalSlide = @data.length
    @currentSlide = 0
    @slides = []
    for item in @data
      @slides.push new Slide item
    console.log @slides
    for index in[0...3]
      @create( @slides[index] )
    @slides[0].class('current')
    @slides[1].class('next')
    @slides[2].class('far_next')
    self = @

    document.addEventListener "keydown", (e)->
      switch e.keyCode
        when 37
          self.left()
        when 39
          self.right()

  create: (slide) ->
    container.appendChild slide.element

  right: ->
    if @currentSlide < @totalSlide-1
      @currentSlide += 1

      console.log @currentSlide

      if @currentSlide > 0
        @slides[@currentSlide-1].class('prev')
      if @currentSlide > 1
        @slides[@currentSlide-2].class('far_prev')
      if @currentSlide > 2
        @slides[@currentSlide-3].remove()

      @slides[@currentSlide].class('current')

      if @currentSlide < @totalSlide-1
        @slides[@currentSlide+1].class('next')
      if @currentSlide < @totalSlide-2
        @create @slides[@currentSlide+2]
        @slides[@currentSlide+2].class('far_next')

    return

  left: ->
    if @currentSlide > 0
      @currentSlide -= 1

      console.log @currentSlide

      if @currentSlide < @totalSlide
        @slides[@currentSlide+1].class('next')
      if @currentSlide < @totalSlide-2
        @slides[@currentSlide+2].class('far_next')
      if @currentSlide < @totalSlide-3
        @slides[@currentSlide+3].remove()

      @slides[@currentSlide].class('current')

      if @currentSlide > 0
        @slides[@currentSlide-1].class('prev')
      if @currentSlide > 1
        @create @slides[@currentSlide-2]
        @slides[@currentSlide-2].class('far_prev')

    return

class Slide
  constructor: (@data) ->
    @element = document.createElement('section')
    @element.innerHTML = @data.content
    @element.id = 'slide-'+@data.id
    @element.className = 'slide'

  class: (className)->
    if className
      @element.className = 'slide '+className
    return

  remove: ->
    $(@element).remove()


init()