
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerSession(){
        if(!sessionStorage.getItem("currentuser")){
            return null;
        }
        return JSON.parse(sessionStorage.getItem("currentuser"));
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all";
        let user_session = this.obtenerSession();
        $.post(url,user_session, (response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        $.post(this.urlBase + '/delete/'+eventId, {id: eventId}, (response) => {
            alert(response);
            $('.delete').find('img').attr('src', "./img/delete.png");
            $('.delete').css('background-color', '#8B0913');
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let user_session = this.obtenerSession();
                let ev = {
                    idUser: user_session.id,
                    title: title,
                    start: start,
                    end: end,
                    allDay: $('#allDay').is(':checked')
                }
                $.post(url, ev, (response) => {
                    alert(response);
                    window.location.reload();
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actualizarEvento(event){
        console.log(event);
        let eventId = event.id
        let evento = {
            id: event.id,
            start: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(event.end).format('YYYY-MM-DD HH:mm:ss')
        };
        $.post(this.urlBase + '/update/'+eventId, {evento: evento}, (response) => {
            alert(response);
            $('.delete').find('img').attr('src', "./img/delete.png");
            $('.delete').css('background-color', '#8B0913');
        })
    }

    inicializarFormulario() {
        if(!this.obtenerSession()) window.location.href= "/";
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        });
        $("#logout").on('click', function(){
            sessionStorage.removeItem("currentuser");
            window.location.href = '/';
        });
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2019-10-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "./img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
        })
    }
}

const Manager = new EventManager()
