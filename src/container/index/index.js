export class Todo {
  static #list = []
  static #count = 0

  static #createTackData = (text) => {
    this.#list.push({
      id: ++this.#count,
      text,
      done: false,
    })
  }

  static #block = null
  static #template = null
  static #input = null
  static #button = null

  static init = () => {
    this.#template = document.getElementById('task').content.firstElementChild

    this.#block = document.querySelector('.task__list')

    this.#input = document.querySelector('.form__input')

    this.#button = document.querySelector('.form__button')
    console.log(this.#block, this.#template, this.#input, this.#button)
    this.#button.onclick = this.#handleAdd
    this.#render()
  }
  static #handleAdd = () => {
    const text = this.#input.value
    if (text.length > 1) {
      this.#createTackData(text)
      this.#input.value = ''
      this.#render()
    }
  }

  static #render = () => {
    this.#block.innerHTML = ''
    if (this.#list.length === 0) this.#block.innerText = 'Список задач пустий'
    else {
      this.#list.forEach((taskData) => {
        const el = this.#createTaskElem(taskData)
        this.#block.append(el)
      })
    }
  }
  static #createTaskElem = (data) => {
    const el = this.#template.cloneNode(true)
    const [id, text, btnDo, btnCancel] = el.children
    id.innerText = `${data.id}.`
    text.innerText = data.text
    btnCancel.onclick = this.#handleCancel(data)
    btnDo.onclick = this.#handleDo(data)
    return el
  }

  //static #handleDo = (data) => () => {}

  //static #tongleDone = (data) => () => {}

  static #handleCancel = (data) => () => {
    if (confirm('Видалити задачу?')) {
      const result = this.#deleteById(data.id)
      if (result) this.#render()
    }
  }

  static #deleteById = (id) => {
    this.#list = this.#list.filter((item) => item.id !== id)
    return true
  }
}

Todo.init()
window.todo = Todo

// import '../../script/test'

// console.log('container')
// const page = document.querySelector('.page')
// const title = document.createElement('h1')
// title.innerHTML = 'To-do list'
// page.append(title)

// const form = document.createElement('div')
// const input = document.createElement('input')
// const button = document.createElement('button')
// button.innerHTML = 'Додати'
// form.append(input)
// form.append(button)
// page.append(form)

// const list = document.createElement('ol')
// const item = document.createElement('li')
// item.innerHTML = 'Some placeholder content in a paragraph below the heading and date.'
// const taskbutton = document.createElement('button')
// const taskImg = document.createElement('button')
// taskImg.src = 'svg/taskImg.svg'
// taskbutton.append(taskImg)
// item.append(taskbutton)

// list.append(item)

// page.append(list)
