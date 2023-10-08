  
int light_sensor = A3; 
int led = 6;
 
void setup() {
Serial.begin(9600); //begin Serial Communication
pinMode(led, OUTPUT);
}
 
void loop() {
  int light = analogRead(light_sensor); // read the raw value from light_sensor pin (A3)

  Serial.println(light); // print the light value in Serial Monitor
  if(light<50)
  {
    digitalWrite(led,HIGH);
  }
  else
  {
    digitalWrite(led,LOW);
  }
 
  delay(1000); // add a delay to only read and print every 1 second
}
