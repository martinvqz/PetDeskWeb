import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

    render() {
        return (
            <div style={{
                backgroundColor: "#2DCCE8",
                backgroundImage: 'url("/assets/images/dog_cat_1920x1080.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "multiply"
            }}>
            <h1
                style={{
                    fontSize: "65px",
                    color: "#ffffff",
                    lineHeight: "1.2",
                    textAlign: "center",
                    fontFamily:"Open Sans",
                    fontWeight: "800",
                    fontStyle:"normal"}}>
            Veterinary Client
            <p>Communication Technology</p></h1>
            <h2 style={{ color: "#ffffff", textAlign: "center"}}>Save time so you can help clients and heal pets.</h2>
         </div>
    );
  }
}
