terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "my_weather_app" {
  name = "my-weather-app" 
  
  build {
    context = path.module
  }
}

resource "docker_container" "my_weather_app" {
  name  = "my-weather-app-container"  
  image = docker_image.my_weather_app.image_id  

  ports {
    internal = 5000  
    external = 5000   
  }
}