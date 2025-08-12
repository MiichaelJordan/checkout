document.addEventListener("DOMContentLoaded", async function () {
    const mp = new MercadoPago(MP_PUBLIC_KEY, { locale: "pt-BR" });

    try {
        const resp = await fetch("/criar_preference", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plano })
        });

        const data = await resp.json();
        if (data.id) {
            mp.checkout({
                preference: { id: data.id },
                autoOpen: true
            });
        } else {
            document.body.innerHTML = `<h1>Erro</h1><p>${data.erro || "Não foi possível iniciar o pagamento."}</p>`;
        }
    } catch (e) {
        document.body.innerHTML = `<h1>Erro</h1><p>${e.message}</p>`;
    }
});
