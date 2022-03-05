function Temp () {
    Tiempo = input.runningTime() - TInicial
    if (Tiempo > 3000) {
        Temporizador = 1
    }
    return Temporizador
}
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Ventana)
})
function ResetT () {
    TInicial = input.runningTime()
    Temporizador = 0
}
input.onButtonPressed(Button.B, function () {
    basic.showNumber(Ventilador)
})
let CO2 = 0
let Ventilador = 0
let Ventana = 0
let Tiempo = 0
let TInicial = 0
let Temporizador = 0
Temporizador = 0
TInicial = 0
let Fase = 0
let Indicador = game.createSprite(0, 4)
let Servo = game.createSprite(0, 0)
let Rele = game.createSprite(4, 0)
basic.forever(function () {
    CO2 = Math.map(input.acceleration(Dimension.X), -1023, 1023, 0, 4)
    Indicador.set(LedSpriteProperty.X, CO2)
    if (CO2 < 1) {
        Ventana = 0
        Ventilador = 0
        Fase = 0
    }
    if (CO2 > 2) {
        if (Fase == 0) {
            Ventana = 127
            Ventilador = 0
            Fase = 1
            ResetT()
        }
        if (Fase == 1 && Temp()) {
            Ventana = 255
            Ventilador = 0
            Fase = 2
            ResetT()
        }
        if (Fase == 2 && Temp()) {
            Ventana = 0
            Ventilador = 1
        }
    }
    Servo.set(LedSpriteProperty.Brightness, Ventana)
    Rele.set(LedSpriteProperty.Brightness, Ventilador * 255)
})
